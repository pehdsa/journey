import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format, isSameDay, isBefore  } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CreateActivityModal } from "./create-activity-modal";
import { Button } from "../../components/button";
import { Plus } from "lucide-react";
import { NewActivity } from "./create-activity-modal";

interface Activity {
    date: string
    activities: Array<{
        id?: string
        title: string
        occurs_at: string
        trip_id?: string
    }>
}

export const Activities = () => {
    const { tripId } = useParams();
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        api.get(`trip/${ tripId }/activities`).then(response => {
            setActivities(response.data.activities)
        });
    },[tripId])

    const openCreateActivityModal = () => {
        setIsCreateActivityModalOpen(true);   
    }
    const closeCreateActivityModal = () => {
        setIsCreateActivityModalOpen(false);   
    }

    const handleNewActivity = (activity: NewActivity) => {

        const newActivities = activities.map(item => {            
            if (isSameDay(item.date, activity.occurs_at)) {

                const newActivitiesitem = [
                    ...item.activities,
                    {
                        title: activity.title,
                        occurs_at: activity.occurs_at,
                        trip_id: tripId
                    }
                ]

                //@ts-ignore
                newActivitiesitem.sort((a, b) => { return new Date(a.occurs_at) - new Date(b.occurs_at); });

                return {
                    date: item.date,
                    activities: newActivitiesitem
                } 
            }            
            return item;            
        });            
        
        setActivities(newActivities);

        setIsCreateActivityModalOpen(false);

    }
        
    return (
        <>
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={openCreateActivityModal}>
                <Plus className='size-5 ' />
                Cadastrar atividade                            
            </Button>
        </div>

        <div className="space-y-8">

            { activities?.map(activity => (
                <div key={activity.date} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-xl text-zinc-300 font-semibold">Dia { format(activity.date, 'dd', { locale: ptBR }) }</span>
                        <span className="text-xs text-zinc-500">{ format(activity.date, 'EEEE', { locale: ptBR }) }</span>
                    </div>
                    { activity.activities.length === 0 
                        ? <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p> 
                        : 
                        <div className="space-y-2.5">
                            { activity.activities.map(item => (
                                <div key={item.id} className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                    <CircleCheck className="size-5 text-lime-300" />
                                    <span className="text-zinc-100">{ item.title }</span>
                                    <span className="text-zinc-400 text-sm ml-auto">{ format(item.occurs_at,"kk':'mm") }</span>
                                </div>
                            )) }
                        </div>
                    }
                </div>
            )) }

        </div>

        { isCreateActivityModalOpen && (
            <CreateActivityModal 
                closeCreateActivityModal={closeCreateActivityModal}
                updateAndCloseModal={(activity) => handleNewActivity(activity)}
            />
        ) }

        </>
    )
}


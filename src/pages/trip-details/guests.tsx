import { useEffect, useState } from "react";
import { UserCog, CircleDashed, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participants {
    id: string,
    name: string | null,
    email: string,
    is_confirmed: boolean
}

export const Guests = () => {
    const { tripId } = useParams();
    const [ participants, setParticipants ] = useState<Participants[]>([])

    useEffect(() => {
        api.get(`trip/${ tripId }/participants`).then(response => {
            setParticipants(response.data.participants)
        });
    },[tripId])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                
                { participants?.map((participant, idx) => (
                    <div key={participant.id} className="flex items-center justify-between gap-4">
                        <div className="flex-1 space-y-1">
                            <h3 className="text-zinc-100 font-medium">{ participant.name ?? `Convidado ${ idx }` }</h3>
                            <p className="block truncate text-sm text-zinc-400">{ participant.email }</p>
                        </div>
                        { participant.is_confirmed ? <CheckCircle2 className="size-5 text-lime-300" />  : <CircleDashed className="size-5 " /> }                        
                    </div>    
                )) }
                                        
            </div>
            <Button variant="secondary" size="full">
                <UserCog className='size-5 text-zinc-400' />
                Gerenciar convidado
            </Button>
        </div>
    )
}

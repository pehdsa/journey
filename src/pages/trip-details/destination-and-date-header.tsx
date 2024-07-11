import { useEffect, useState } from "react";
import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}

export const DestinationAndDateHeader = () => {
    const { tripId } = useParams();
    const [ trip, setTrip ] = useState<Trip | undefined>()

    useEffect(() => {
        api.get(`trip/${ tripId }`).then(response => setTrip(response.data.trip));
    },[tripId])

    const displayedDate = trip?.starts_at && trip.ends_at
        ? `${format(trip?.starts_at, "d' de 'LLL", { locale: ptBR })} até ${format(trip.ends_at, "d' de 'LLL", { locale: ptBR })} `
        : null

    return (
        <header className="px-4 h-16 rounded-xl shadow-shape bg-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-100">{ trip?.destination }</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-100">{ displayedDate }</span>
                </div>
                <div className="w-px h-6 bg-zinc-800" />
                <Button                         
                    variant="secondary"
                >
                    Alterar local e data
                    <Settings2 className='size-5 ' />
                </Button>
            </div>

        </header>
    )
}


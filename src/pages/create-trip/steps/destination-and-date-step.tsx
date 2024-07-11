
import { useState } from 'react';
import { MapPin, Calendar, ArrowRight, Settings2 } from 'lucide-react';
import { Button } from '../../../components/button';
import { Modal } from '../../../components/modal';
import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker"
import "react-day-picker/dist/style.css";
 
interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean,
    closeGuestInput: () => void,
    openGuestInput: () => void,
    setDestination: (destination: string) => void
    eventStartAndEndDates: DateRange | undefined
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export const DestinationAndDateStep = ({ 
    isGuestInputOpen, 
    closeGuestInput, 
    openGuestInput,
    setDestination,
    eventStartAndEndDates,
    setEventStartAndEndDates
}: DestinationAndDateStepProps) => {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    // const [ eventStartAndEndDates, setEventStartAndEndDates ] = useState<DateRange | undefined>()

    const openDatePicker = () => {
        setIsDatePickerOpen(true)
    }

    const closeDatePicker = () => {
        setIsDatePickerOpen(false)
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? `${format(eventStartAndEndDates.from, "d' de 'LLL")} até ${format(eventStartAndEndDates.to, "d' de 'LLL")} `
        : null

    return (
        <div className="w-full flex items-center justify-center h-16 bg-zinc-900 px-4 rounded-xl shadow-shape">
                    
            <div className='flex items-center gap-2 flex-1 h-full'>
                <MapPin className='size-5 text-zinc-400' />
                <input 
                    type="text" 
                    placeholder="Para onde você vai?" 
                    className="bg-transparent text-left placeholder:text-zinc-400 outline-none h-full"
                    disabled={isGuestInputOpen}
                    onChange={event => setDestination(event.target.value)}
                />
            </div>
            
            <button 
                onClick={openDatePicker}
                disabled={isGuestInputOpen} 
                className='flex items-center gap-2 h-full w-60'
            >
                <Calendar className='size-5 text-zinc-400' />
                <span className="text-left text-zinc-400 outline-none">
                    { displayedDate || 'Quando?' }
                </span>
            </button>

            { isDatePickerOpen && (
                <Modal
                    title='Selecionar data'
                    closeModal={closeDatePicker}
                    size='small'
                >
                    <DayPicker mode='range' selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                </Modal>
            ) }  

            <div className='w-px h-6 bg-zinc-800 mr-4' />

            { isGuestInputOpen ? (
                <Button 
                    onClick={closeGuestInput}
                    variant='secondary'
                >
                    Alterar local e data
                    <Settings2 className='size-5 ' />
                </Button>
            ) : (
                <Button 
                    onClick={openGuestInput}                    
                >
                    Continuar
                    <ArrowRight className='size-5 ' />
                </Button>
            ) }

        </div>
    )
}

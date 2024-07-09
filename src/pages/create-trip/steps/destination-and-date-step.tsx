
import { MapPin, Calendar, ArrowRight, Settings2 } from 'lucide-react';
import { Button } from '../../../components/button';

interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean,
    closeGuestInput: () => void,
    openGuestInput: () => void
}

export const DestinationAndDateStep = ({ 
    isGuestInputOpen, 
    closeGuestInput, 
    openGuestInput 
}: DestinationAndDateStepProps) => {
    return (
        <div className="w-full flex items-center justify-center h-16 bg-zinc-900 px-4 rounded-xl shadow-shape">
                    
            <div className='flex items-center gap-2 flex-1 h-full'>
                <MapPin className='size-5 text-zinc-400' />
                <input 
                    type="text" 
                    placeholder="Para onde você vai?" 
                    className="bg-transparent text-left placeholder:text-zinc-400 outline-none h-full"
                    disabled={isGuestInputOpen}
                />
            </div>
            
            <div className='flex items-center gap-2 h-full'>
                <Calendar className='size-5 text-zinc-400' />
                <input 
                    type="text" 
                    placeholder="Quando?" 
                    className="bg-transparent text-left placeholder:text-zinc-400 outline-none h-full"
                    disabled={isGuestInputOpen}
                />
            </div>

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

import { ArrowRight, UserRoundPlus } from 'lucide-react';
import { Button } from '../../../components/button';

interface InviteGuestStepProps {
    emailsToInvite: string[],
    openGuestModal: () => void,
    openConfirmModal: () => void
}

export const InviteGuestStep = ({
    openGuestModal,
    emailsToInvite,
    openConfirmModal
}: InviteGuestStepProps) => {
  return (
    <div className="w-full flex items-center justify-center h-16 bg-zinc-900 px-4 rounded-xl shadow-shape">
                    
        <button onClick={openGuestModal} type="button" className='flex items-center gap-2 flex-1 h-full'>
            <UserRoundPlus className='size-5 text-zinc-400' />
            { emailsToInvite.length > 0 ? (
                <span className="text-zinc-100"> { emailsToInvite.length } pessoa(s) convidada(s)</span>
            ) : (
                <span className="text-zinc-400">Quem estará na viagem?</span>
            ) }
        </button>

        <div className='w-px h-6 bg-zinc-800 mr-4' />

        <Button onClick={openConfirmModal}>
            Confirmar viagem
            <ArrowRight className='size-5 ' />
        </Button>

    </div>
  )
}


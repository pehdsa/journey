import { useState, FormEvent } from "react";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { InviteGuestModal } from "./invite-guest-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { useNavigate } from "react-router-dom"

export function CreateTripPage() {
    const navigate = useNavigate();
    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [isConfirmOpen, setConfirmModalOpen] = useState(false);

    const [emailsToInvite, setEmailsToInvite] = useState([
        'pehdsa@gmail.com',
        'pedro.duarte@mutant.com.br'
    ]);

    const openGuestInput = () => {
        setIsGuestInputOpen(true);
    }

    const closeGuestInput = () => {
        setIsGuestInputOpen(false);
    }

    const openGuestModal = () => {
        setIsGuestModalOpen(true);
    }

    const closeGuestModal = () => {
        setIsGuestModalOpen(false);
    }

    const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();        

        if (!email) return;

        if (emailsToInvite.includes(email)) return;

        setEmailsToInvite(prev => [...prev, email ]);

        event.currentTarget.reset();
    }

    const removeEmailFromInvites = (email: string) => {
        console.log(email);
        const newEmailList = emailsToInvite.filter(item => item !== email);
        setEmailsToInvite(newEmailList);
    }

    const openConfirmModal = () => {
        setConfirmModalOpen(true)
    }

    const closeConfirmModal = () => {
        setConfirmModalOpen(false)
    }

    const confirmTripCreated = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //TODO confirmation
        navigate("/trips/123");
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center max-w-3xl px-6 min-h-screen mx-auto text-center gap-y-10 bg-pattern bg-no-repeat bg-center">
            
            <div className='flex flex-col items-center justify-center gap-2'>
                <img src='/logo.svg' alt='plann.er' />
                <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
            </div>
            
            <div className="space-y-4">
               <DestinationAndDateStep 
                    isGuestInputOpen={ isGuestInputOpen }
                    closeGuestInput={ closeGuestInput }
                    openGuestInput={ openGuestInput }
               />

                { isGuestInputOpen && (
                    <InviteGuestStep 
                        emailsToInvite={emailsToInvite}
                        openConfirmModal={openConfirmModal}
                        openGuestModal={openGuestModal}
                    />
                )}
            </div>
           
            <p className="text-zinc-500 text-sm max-w-md block">
                Ao planejar sua viagem pela plann.er você automaticamente concorda
                com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
            </p>
        </div>
        
        { isGuestModalOpen && (
            <InviteGuestModal 
                closeGuestModal={ closeGuestModal }
                emailsToInvite={ emailsToInvite }
                removeEmailFromInvites={ removeEmailFromInvites }
                addNewEmailToInvite={ addNewEmailToInvite }
            />        
        ) }

        { isConfirmOpen && (
            <ConfirmTripModal 
                closeConfirmModal={ closeConfirmModal }
                confirmTripCreated={ confirmTripCreated }
            />
        ) }

        </>
    )
}

import { useState, FormEvent } from "react";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { InviteGuestModal } from "./invite-guest-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { useNavigate } from "react-router-dom"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios";

export function CreateTripPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [isConfirmOpen, setConfirmModalOpen] = useState(false);
    
    const [destination, setDestination] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setownerEmail] = useState('');
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

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

        if (emailsToInvite.length > 0 && emailsToInvite.includes(email)) return;

        setEmailsToInvite([...emailsToInvite, email ]);

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

    const confirmTripCreated = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (!destination) { return }
            if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to) { return }
            if (emailsToInvite.length === 0) { return }
            if (!ownerName || !ownerEmail) { return }

            const resp = await api.post('/trips',{
                destination,
                starts_at: eventStartAndEndDates?.from,
                ends_at: eventStartAndEndDates?.to,
                owner_name: ownerName,
                owner_email: ownerEmail,
                emails_to_invite: emailsToInvite
            });
            setIsLoading(false);

            if (!resp || !!resp.data.tripId === false) {
                alert("Algum erro")
                return;
            }

            navigate(`/trips/${ resp.data.tripId }`);
        } catch (error) {
            alert("Erro")
            console.log("Ocorreu um erro", error)
        } finally {
            setIsLoading(false);
        }
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
                    setDestination={setDestination}
                    eventStartAndEndDates={eventStartAndEndDates}
                    setEventStartAndEndDates={setEventStartAndEndDates}
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
                setOwnerName={setOwnerName}
                setownerEmail={setownerEmail}
                isLoading={isLoading}
            />
        ) }

        </>
    )
}

import { Modal } from "../../components/modal";
import { FormEvent } from "react";
import { X, AtSign, Plus } from "lucide-react"
import { Button } from "../../components/button";

interface InviteGuestModalProps {
    closeGuestModal: () => void,
    emailsToInvite: string[];
    removeEmailFromInvites: (item: string) => void,
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
}

export const InviteGuestModal = ({ 
    closeGuestModal, 
    emailsToInvite,
    removeEmailFromInvites,
    addNewEmailToInvite
}: InviteGuestModalProps) => {
  return (
    <Modal 
        title="Selecionar convidado"
        subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem."
        closeModal={closeGuestModal}
    >
        <div className="flex flex-wrap gap-2">                        
            { emailsToInvite?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-center bg-zinc-800 rounded-md px-2.5 py-1.5 gap-2 text-zinc-300 text-sm">
                    { item }
                    <button onClick={() => removeEmailFromInvites(item)} type="button"><X className="size-4 text-zinc-400 hover:text-zinc-300" /></button>
                </div>
            ))}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form 
            onSubmit={addNewEmailToInvite}
            className="flex items-center justify-between p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 gap-2.5"
        >
            <div className="flex gap-2.5 flex-1 h-full pl-2">
                <AtSign className="text-zinc-400 size-5" />
                <input 
                    type="email" 
                    name="email" 
                    className="w-full h-full bg-transparent placeholder:text-zinc-400 outline-none text-sm" 
                    placeholder="Digite o e-mail do convidado" 
                />
            </div>
            <Button 
                type="submit"
            >
                Convidar
                <Plus className="size-5" />
            </Button>
        </form>
    </Modal> 
  )
}

import { Modal } from "../../components/modal";
import { FormEvent } from "react";
import { User, Mail } from "lucide-react"
import { Button } from "../../components/button";
import { Input } from "../../components/input";

interface ConfirmTripModalProps {
    closeConfirmModal: () => void,
    confirmTripCreated: (event: FormEvent<HTMLFormElement>) => void
}

export const ConfirmTripModal = ({ 
    closeConfirmModal,
    confirmTripCreated
}: ConfirmTripModalProps) => {
    return (
        <Modal 
            title="Confirmar criação da viagem" 
            subtitle={ <p>Para concluir a criação da viagem para <span className="font-bold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-bold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p> }
            closeModal={closeConfirmModal}
        >
            
            <form 
                onSubmit={confirmTripCreated}
                className="space-y-3"
            >
                <div className="space-y-2">
                    <Input 
                        icon={ <User className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 size-5" /> }
                        name="nome"
                        placeholder="Seu nome completo" 
                    />
                    <Input 
                        icon={ <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 size-5" /> }
                        type="email" 
                        name="email" 
                        placeholder="Seu e-mail pessoal" 
                    />
                </div>
                <Button type="submit" size="full">
                    Confirmar criação da viagem                        
                </Button>
            </form>

        </Modal>
    )
}


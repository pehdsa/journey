import { FormEvent } from "react"
import { Modal } from '../../components/modal';
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Calendar, Tag } from "lucide-react";

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void,
    createTripActivity: (event: FormEvent<HTMLFormElement>) => void
}

export const CreateActivityModal = ({
    closeCreateActivityModal,
    createTripActivity
}: CreateActivityModalProps) => {
    return (
        <Modal 
            title="Cadastrar atividade"
            subtitle="Todos convidados podem visualizar as atividades."
            closeModal={ closeCreateActivityModal }
        >
            <form 
                onSubmit={createTripActivity}
                className="space-y-3"
            >
                <div className="space-y-2">
                    <Input 
                        icon={ <Tag className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 size-5" /> }
                        name="activity"
                        placeholder="Qual a atividade" 
                    />
                    <Input 
                        icon={ <Calendar className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 size-5" /> }
                        type="datetime-local" 
                        name="occurs-at" 
                        placeholder="Data e horário da atividade" 
                    />
                </div>
                <Button type="submit" size="full">
                    Salvar atividade       
                </Button>
            </form>
        </Modal>
    )
}

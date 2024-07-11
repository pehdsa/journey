import { FormEvent, useState } from "react"
import { Modal } from '../../components/modal';
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Calendar, Tag } from "lucide-react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

export interface NewActivity {
    title: string
    occurs_at: string
}

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void,
    updateAndCloseModal: (activity: NewActivity) => void
    // createTripActivity: (event: FormEvent<HTMLFormElement>) => void
}

export const CreateActivityModal = ({
    closeCreateActivityModal,
    updateAndCloseModal
}: CreateActivityModalProps) => {
    const { tripId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const createTripActivity = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title')?.toString();
        const occurs_at = data.get('occurs-at')?.toString();
        setIsLoading(true);

        if (!title || !occurs_at) {
            setIsLoading(false);
            return;
        }

        try {
            const resp = await api.post(`trip/${ tripId }/activity`, {
                title,
                occurs_at
            })

            if (!!resp.data.errors) {
                throw new Error(resp.data.errors)
            }

            updateAndCloseModal({ title, occurs_at })

        } catch (error) {
            alert('Erro');
            console.log(error)
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <Modal 
            title="Cadastrar atividade"
            subtitle="Todos convidados podem visualizar as atividades."
            closeModal={() => closeCreateActivityModal() }
        >
            <form 
                onSubmit={createTripActivity}
                className="space-y-3"
            >
                <div className="space-y-2">
                    <Input 
                        icon={ <Tag className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 size-5" /> }
                        name="title"
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
                    { isLoading ? "Carregando..." : 'Salvar atividade' }                       
                </Button>
            </form>
        </Modal>
    )
}

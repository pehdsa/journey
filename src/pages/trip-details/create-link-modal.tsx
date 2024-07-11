import { FormEvent, useState } from "react"
import { Modal } from '../../components/modal';
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link2, Tag } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Link } from "./important-links";

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void,
    updateAndCloseModal: (link: Link) => void
}

export const CreateLinkModal = ({ 
    closeCreateLinkModal,
    updateAndCloseModal
}: CreateLinkModalProps) => {
    const { tripId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const createLink = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const title = data.get('title')?.toString();
        const url = data.get('link')?.toString();
        setIsLoading(true);

        if (!title || !url) {
            setIsLoading(false);
            return;
        }
        
        try {
            const resp = await api.post(`trip/${ tripId }/link`, {
                title,
                url
            })

            if (!!resp.data.errors) {
                throw new Error(resp.data.errors)
            }

            updateAndCloseModal({ title, url })

        } catch (error) {
            alert('Erro');
            //@ts-ignore
            const messageError = JSON.parse(error.request.response);
            console.log(messageError.errors);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <Modal 
            title="Cadastrar link"
            subtitle="Todos convidados podem visualizar os links importantes."
            closeModal={ closeCreateLinkModal }
        >
            <form 
                onSubmit={createLink}
                className="space-y-3"
            >
                <div className="space-y-2">
                    <Input 
                        icon={ <Tag className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 size-5" /> }
                        name="title"
                        placeholder="Título do link" 
                    />
                    <Input 
                        icon={ <Link2 className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 size-5" /> }
                        name="link" 
                        placeholder="URL" 
                    />
                </div>
                <Button type="submit" size="full">
                    { isLoading ? 'Carregando...' : 'Salvar link' }                    
                </Button>
            </form>
        </Modal>
    )
}


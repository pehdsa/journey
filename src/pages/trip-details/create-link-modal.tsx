import { FormEvent } from "react"
import { Modal } from '../../components/modal';
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link2, Tag } from "lucide-react";

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void,
    createLink: (event: FormEvent<HTMLFormElement>) => void
}

export const CreateLinkModal = ({ 
    closeCreateLinkModal,
    createLink
}: CreateLinkModalProps) => {
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
                        name="link-title"
                        placeholder="Título do link" 
                    />
                    <Input 
                        icon={ <Link2 className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 size-5" /> }
                        name="link" 
                        placeholder="URL" 
                    />
                </div>
                <Button type="submit" size="full">
                    Salvar link  
                </Button>
            </form>
        </Modal>
    )
}


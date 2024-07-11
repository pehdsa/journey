import { useEffect, useState } from "react";
import { Plus, Link2 } from "lucide-react";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

export interface Link {
    id?: string
    title: string
    url: string
    trip_id?: string
}

export const ImportantLinks = () => {
    const { tripId } = useParams();
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
    const [links, setLinks] = useState<Link[]>([])

    useEffect(() => {
        api.get(`trip/${ tripId }/links`).then(response => {
            setLinks(response.data.links)
        });
    },[tripId])

    const openCreateLinkModal = () => {
        setIsCreateLinkModalOpen(true);   
    }
    const closeCreateLinkModal = () => {
        setIsCreateLinkModalOpen(false);   
    }

    const handleNewLink = (link: Link) => {
        setLinks([
            ...links,
            link
        ])
        setIsCreateLinkModalOpen(false);
    }

    return (
        <>
            <div className="space-y-6">
                <h2 className="font-semibold text-xl">Links importantes</h2>
                <div className="space-y-5">

                    { links.map(link => (
                        <div key={ link.id } className="flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-1">
                                <h3 className="text-zinc-100 font-medium">{ link.title }</h3>
                                <a href={ link.url } target="_blank" className="block truncate text-xs text-zinc-400 hover:text-zinc-200">{ link.url }</a>
                            </div>
                            <Link2 className="size-5 " />
                        </div>
                    )) }

                </div>
                <Button onClick={openCreateLinkModal} variant="secondary" size="full">
                    <Plus className='size-5 text-zinc-400' />
                    Cadastrar novo link
                </Button>
            </div>
            { isCreateLinkModalOpen && (
                <CreateLinkModal 
                    closeCreateLinkModal={closeCreateLinkModal}
                    updateAndCloseModal={(link) => handleNewLink(link)}
                />
            ) }
        </>
    )
}

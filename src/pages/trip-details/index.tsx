
import { useState, FormEvent } from "react";
import { Plus } from "lucide-react";
import { CreateActivityModal } from "./create-activity-modal";
import { CreateLinkModal } from "./create-link-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";

export const TripDetails = () => {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

    const openCreateActivityModal = () => {
        setIsCreateActivityModalOpen(true);   
    }
    const closeCreateActivityModal = () => {
        setIsCreateActivityModalOpen(false);   
    }

    const createTripActivity = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // event.currentTarget.reset();
    }

    const openCreateLinkModal = () => {
        setIsCreateLinkModalOpen(true);   
    }
    const closeCreateLinkModal = () => {
        setIsCreateLinkModalOpen(false);   
    }

    const createLink = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // event.currentTarget.reset();
    }


    return (
        <>
        <div className="max-w-6xl py-10 px-6 mx-auto space-y-8">
            
            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                
                <div className="flex-1 space-y-6">
                    
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <Button onClick={openCreateActivityModal}>
                            <Plus className='size-5 ' />
                            Cadastrar atividade                            
                        </Button>
                    </div>

                    <Activities />

                </div>
                
                <div className="w-full max-w-80 space-y-6">
                    <ImportantLinks 
                        openCreateLinkModal={ openCreateLinkModal }
                    />                    
                    <div className="w-full h-px bg-zinc-800" />                    
                    <Guests />
                </div>
            </main>

        </div>

        { isCreateActivityModalOpen && (
            <CreateActivityModal 
                closeCreateActivityModal={closeCreateActivityModal}
                createTripActivity={ createTripActivity }
            />
        ) }

        { isCreateLinkModalOpen && (
            <CreateLinkModal 
                closeCreateLinkModal={closeCreateLinkModal}
                createLink={createLink}
            />
        ) }

        </>
    )
}


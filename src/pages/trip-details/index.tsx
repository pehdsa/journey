
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export const TripDetails = () => {
    return (
        <div className="max-w-6xl py-10 px-6 mx-auto space-y-8">
            
            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                
                <div className="flex-1 space-y-6">
                    <Activities />
                </div>
                
                <div className="w-full max-w-80 space-y-6">
                    <ImportantLinks />
                    <div className="w-full h-px bg-zinc-800" />                    
                    <Guests />
                </div>
            </main>

        </div>
    )
}


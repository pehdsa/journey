import { Plus, Link2 } from "lucide-react";
import { Button } from "../../components/button";

interface ImportantLinksProps {
    openCreateLinkModal: () => void
}

export const ImportantLinks = ({
    openCreateLinkModal
}: ImportantLinksProps) => {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <h3 className="text-zinc-100 font-medium">Reserva AirBnB</h3>
                        <a href="" className="block truncate text-xs text-zinc-400 hover:text-zinc-200">https://www.airbnb.com.br/rooms/104700011</a>
                    </div>
                    <Link2 className="size-5 " />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <h3 className="text-zinc-100 font-medium">Reserva AirBnB</h3>
                        <a href="" className="block truncate text-xs text-zinc-400 hover:text-zinc-200">https://www.airbnb.com.br/rooms/104700011</a>
                    </div>
                    <Link2 className="size-5 " />
                </div>
            </div>
            <Button onClick={openCreateLinkModal} variant="secondary" size="full">
                <Plus className='size-5 text-zinc-400' />
                Cadastrar novo link
            </Button>
        </div>
    )
}

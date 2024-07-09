import { UserCog, CircleDashed } from "lucide-react";
import { Button } from "../../components/button";

export const Guests = () => {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <h3 className="text-zinc-100 font-medium">Pedro Henrique</h3>
                        <p className="block truncate text-sm text-zinc-400">pehdsa@gmail.com</p>
                    </div>
                    <CircleDashed className="size-5 " />
                </div>                            
            </div>
            <Button variant="secondary" size="full">
                <UserCog className='size-5 text-zinc-400' />
                Gerenciar convidado
            </Button>
        </div>
    )
}

import { useState, FormEvent } from "react";
import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react';

export function App() {
    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

    const [emailsToInvite, setEmailsToInvite] = useState([
        'pehdsa@gmail.com',
        'pedro.duarte@mutant.com.br'
    ]);

    const openGuestInput = () => {
        setIsGuestInputOpen(true);
    }

    const closeGuestInput = () => {
        setIsGuestInputOpen(false);
    }

    const openGuestModal = () => {
        setIsGuestModalOpen(true);
    }

    const closeGuestModal = () => {
        setIsGuestModalOpen(false);
    }

    const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();        

        if (!email) return;

        if (emailsToInvite.includes(email)) return;

        setEmailsToInvite(prev => [...prev, email ]);

        event.currentTarget.reset();
    }

    const removeEmailFromInvites = (email: string) => {
        console.log(email);
        const newEmailList = emailsToInvite.filter(item => item !== email);
        setEmailsToInvite(newEmailList);
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center max-w-3xl px-6 min-h-screen mx-auto text-center gap-y-10 bg-pattern bg-no-repeat bg-center">
            
            <div className='flex flex-col items-center justify-center gap-2'>
                <img src='/logo.svg' alt='plann.er' />
                <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
            </div>
            
            <div className="space-y-4">
                <div className="w-full flex items-center justify-center h-16 bg-zinc-900 px-4 rounded-xl shadow-shape">
                    
                    <div className='flex items-center gap-2 flex-1 h-full'>
                        <MapPin className='size-5 text-zinc-400' />
                        <input 
                            type="text" 
                            placeholder="Para onde você vai?" 
                            className="bg-transparent text-left placeholder:text-zinc-400 outline-none h-full"
                            disabled={isGuestInputOpen}
                        />
                    </div>
                    
                    <div className='flex items-center gap-2 h-full'>
                        <Calendar className='size-5 text-zinc-400' />
                        <input 
                            type="text" 
                            placeholder="Quando?" 
                            className="bg-transparent text-left placeholder:text-zinc-400 outline-none h-full"
                            disabled={isGuestInputOpen}
                        />
                    </div>

                    <div className='w-px h-6 bg-zinc-800 mr-4' />

                    { isGuestInputOpen ? (
                        <button 
                            onClick={closeGuestInput}
                            className="flex items-center justify-center bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium gap-2 hover:bg-zinc-700"
                        >
                            Alterar local e data
                            <Settings2 className='size-5 ' />
                        </button>
                    ) : (
                        <button 
                            onClick={openGuestInput}
                            className="flex items-center justify-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium gap-2 hover:bg-lime-400"
                        >
                            Continuar
                            <ArrowRight className='size-5 ' />
                        </button>
                    ) }

                </div>

                { isGuestInputOpen && (
                    <div className="w-full flex items-center justify-center h-16 bg-zinc-900 px-4 rounded-xl shadow-shape">
                    
                        <button onClick={openGuestModal} type="button" className='flex items-center gap-2 flex-1 h-full'>
                            <UserRoundPlus className='size-5 text-zinc-400' />
                            <span className="text-zinc-400">Quem estará na viagem?</span>                            
                        </button>

                        <div className='w-px h-6 bg-zinc-800 mr-4' />

                        <button 
                            className="flex items-center justify-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium gap-2 hover:bg-lime-400"
                        >
                            Confirmar viagem
                            <ArrowRight className='size-5 ' />
                        </button>

                    </div>
                )}
            </div>
           
            <p className="text-zinc-500 text-sm max-w-md block">
                Ao planejar sua viagem pela plann.er você automaticamente concorda
                com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
            </p>
        </div>
        
        { isGuestModalOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Selecionar convidado</h2>
                            <button type="button" onClick={closeGuestModal}>
                                <X className="size-5 text-zinc-400" />
                            </button>
                        </div>
                        <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">                        
                        { emailsToInvite?.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-center bg-zinc-800 rounded-md px-2.5 py-1.5 gap-2 text-zinc-300 text-sm">
                                { item }
                                <button onClick={() => removeEmailFromInvites(item)} type="button"><X className="size-4 text-zinc-400 hover:text-zinc-300" /></button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full h-px bg-zinc-800" />

                    <form 
                        onSubmit={addNewEmailToInvite}
                        className="flex items-center justify-between p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 gap-2.5"
                    >
                        <div className="flex gap-2.5 flex-1 h-full pl-2">
                            <AtSign className="text-zinc-400 size-5" />
                            <input 
                                type="email" 
                                name="email" 
                                className="w-full h-full bg-transparent placeholder:text-zinc-400 outline-none text-sm" 
                                placeholder="Digite o e-mail do convidado" 
                            />
                        </div>
                        <button 
                            type="submit"
                            className="flex items-center justify-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium gap-2 hover:bg-lime-400"
                        >
                            Convidar
                            <Plus className="size-5" />
                        </button>
                    </form>

                </div>
            </div>
        ) }

        </>
    )
}

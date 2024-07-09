import { ReactNode } from "react";
import { X } from 'lucide-react';

interface ModalProps {
    title: string,
    subtitle: string | ReactNode,
    children: ReactNode,
    closeModal: () => void
}

export const Modal = ({ title, subtitle, children, closeModal }: ModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <header className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{ title }</h2>
                        <button type="button" onClick={closeModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <div className="text-sm text-zinc-400 pr-5">{ subtitle }</div>
                </header>
                { children }
            </div>
        </div>
    )
}


import { ReactNode, ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
    icon: ReactNode
}

export const Input = ({ icon, ...rest }: InputProps) => {
    return (
        <div className="relative bg-zinc-950 rounded-lg border border-zinc-800">
            { icon }
            <input {...rest} className="relative z-10 w-full h-14 p-2.5 pl-10 bg-transparent placeholder:text-zinc-400 outline-none text-sm [color-scheme:dark]" />
        </div>
    )
}
import React, { useId } from 'react'
import { cn } from '../utils/cn'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full space-y-2'>
            {label && <label
                className='block text-sm font-medium text-zinc-400 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={cn(
                    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/10",
                    "transition-all duration-300",
                    className
                )}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input

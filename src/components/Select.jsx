import React, { useId } from 'react'
import { cn } from '../utils/cn'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full space-y-2'>
            {label && <label htmlFor={id} className='block text-sm font-medium text-zinc-400 pl-1'>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={cn(
                    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none appearance-none cursor-pointer",
                    "focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/10",
                    "transition-all duration-300",
                    className
                )}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className='bg-zinc-900 text-white'>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)

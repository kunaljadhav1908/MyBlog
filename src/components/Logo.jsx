import React from 'react'
import { cn } from '../utils/cn'
import conf from '../conf/conf'

function Logo({ width = '40px', className = "" }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg">
        {conf.projectName.charAt(0).toUpperCase()}
      </div>
      <span className="font-bold text-xl tracking-tight text-white">
        {conf.projectName}
      </span>
    </div>
  )
}

export default Logo
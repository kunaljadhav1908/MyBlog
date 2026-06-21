import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            className={cn(
                "relative overflow-hidden px-6 py-2.5 rounded-xl font-medium transition-all duration-300",
                "shadow-[0_0_20px_rgba(79,70,229,0.1)] hover:shadow-[0_0_25px_rgba(79,70,229,0.3)]",
                "before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:ease-in-out",
                bgColor,
                textColor,
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

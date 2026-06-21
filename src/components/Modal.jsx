import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle } from 'lucide-react'
import { Button } from './index'

export default function Modal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger"
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`p-3 rounded-2xl ${type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                                    <AlertCircle size={24} />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                {message}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    onClick={onClose}
                                    bgColor="bg-white/5"
                                    className="w-full sm:flex-1 border border-white/10"
                                >
                                    {cancelText}
                                </Button>
                                <Button
                                    onClick={onConfirm}
                                    bgColor={type === 'danger' ? 'bg-red-500' : 'bg-indigo-600'}
                                    className="w-full sm:flex-1 shadow-lg shadow-red-500/20"
                                >
                                    {confirmText}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

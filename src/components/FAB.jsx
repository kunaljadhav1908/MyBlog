import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function FAB() {
    const navigate = useNavigate()
    const authStutas = useSelector((state) => state.auth.stutas)

    if (!authStutas) return null

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/add-post')}
            className="fixed bottom-8 right-8 z-[40] p-4 rounded-2xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 hover:bg-indigo-500 transition-colors border border-indigo-400/20"
        >
            <Plus size={28} />
        </motion.button>
    )
}

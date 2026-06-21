import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { UserPlus, AlertCircle } from 'lucide-react'
import conf from '../conf/conf'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        setLoading(true)
        try {
            const trimmedData = {
                ...data,
                email: data.email.trim(),
                password: data.password.trim()
            }
            const session = await authService.createAccount(trimmedData)
            if (session) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login({ userData: currentUser }));
                navigate("/")
            }
        } catch (error) {
            setError(error.message || "An unexpected error occurred during signup")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center w-full py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto w-full max-w-lg glass border border-white/10 rounded-3xl p-10 shadow-2xl space-y-8"
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <Logo width="60px" />
                    <div>
                        <h2 className="text-3xl font-bold text-white">Join {conf.projectName}</h2>
                        <p className="text-zinc-400 mt-2">
                            Already have an account?&nbsp;
                            <Link
                                to="/login"
                                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm"
                    >
                        <AlertCircle size={18} />
                        <p>{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email Address"
                            placeholder="name@example.com"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full py-4 text-lg flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : (
                                <>
                                    <UserPlus size={20} />
                                    <span>Create Account</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default Signup
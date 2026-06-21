import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard, Button } from '../components'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import conf from '../conf/conf'

function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-20 mt-10 text-center">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto space-y-8"
                    >
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium'>
                            <Sparkles size={16} />
                            <span>Welcome to My_Blog</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Share Your <span className="text-blue-500">Stories</span>
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                            A modern space for creators, thinkers, and builders. Share your stories with the world on a platform designed for performance and aesthetics.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button onClick={() => navigate('/signup')} className="px-8 py-4 text-lg w-full sm:w-auto">
                                Get Started
                            </Button>
                            <Button onClick={() => navigate('/login')} bgColor="bg-white/5" className="px-8 py-4 text-lg border border-white/10 w-full sm:w-auto">
                                Sign In
                            </Button>
                        </div>
                    </motion.div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-12'>
            <Container>
                <div className='flex flex-col gap-8'>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='flex items-center justify-between'
                    >
                        <div>
                            <h1 className='text-3xl font-bold'>Latest Stories</h1>
                            <p className='text-zinc-400'>Discover what's new in the community</p>
                        </div>
                        <Button onClick={() => navigate('/all-posts')} bgColor='bg-white/5' className='border border-white/10 hidden sm:flex items-center gap-2'>
                            View All <ArrowRight size={16} />
                        </Button>
                    </motion.div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.$id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PostCard {...post} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home

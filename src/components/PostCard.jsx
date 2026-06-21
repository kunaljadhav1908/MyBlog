import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'

function PostCard({ $id, title, featuredImage, $createdAt }) {

  return (
    <Link to={`/post/${$id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className='group relative h-full glass rounded-3xl overflow-hidden border border-white/5 transition-all duration-500'
      >
        {/* Image Container */}
        <div className='aspect-video overflow-hidden relative'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-white from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />

          {/* Hover Overlay */}
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
            <div className='bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/30'>
              <ArrowRight className='text-white w-6 h-6' />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 space-y-4'>
          <div className='flex items-center gap-2 text-zinc-400 text-xs font-medium'>
            <Calendar className='w-3.5 h-3.5' />
            <span>{new Date($createdAt).toLocaleDateString()}</span>
          </div>

          <h2 className='text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors duration-300'>
            {title}
          </h2>

          <div className='pt-4 border-t border-white/10 flex items-center justify-between text-zinc-500 text-sm'>
            <span>Read more</span>
            <ArrowRight className='w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform' />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default PostCard

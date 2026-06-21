import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Input } from '../components'
import { Search, SlidersHorizontal, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PostCardSkeleton } from '../components/Skeleton'
import useSearch from "../hooks/useSearch";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm, setSearchTerm, filteredItems: filteredPosts } = useSearch(posts, ['title', 'content']);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      } else {
        console.error("AllPosts :: appwriteService.getPosts :: failed to fetch posts");
      }
      setLoading(false);
    }).catch((err) => {
      console.error("AllPosts :: error", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className='w-full py-12'>
      <Container>
        <div className="flex flex-col gap-8">
          {/* Search and Filter Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">All Stories</h1>
              <p className="text-zinc-400">Explore our collection of articles</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  className="pl-11 py-2.5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-3 glass rounded-xl border border-white/10 text-zinc-400 hover:text-white transition-colors">
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {loading ? (
              Array(8).fill(0).map((_, i) => <PostCardSkeleton key={i} />)
            ) : filteredPosts.length > 0 ? (
              <AnimatePresence mode='popLayout'>
                {filteredPosts.map((post) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={post.$id}
                  >
                    <PostCard {...post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="inline-flex p-6 rounded-full bg-white/5 mb-4 text-zinc-600">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-zinc-400">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

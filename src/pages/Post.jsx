import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion'
import { Calendar, User, Edit, Trash2, ArrowLeft } from 'lucide-react'
import Modal from "../components/Modal";
import conf from "../conf/conf";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).catch((error) => {
                console.error("Post :: useEffect :: error", error);
                navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const handleDelete = () => {
        appwriteService.deletePost(post.$id).then((success) => {
            if (success) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        }).catch((error) => {
            console.error("Post :: handleDelete :: error", error);
        });
    };

    if (!post) return null;

    return (
        <div className="py-12">
            <Container>
                <div className="max-w-4xl mx-auto space-y-10">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        <span>Back</span>
                    </motion.button>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-sm border-y border-white/5 py-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                                    {post.author?.[0]?.toUpperCase() || <User size={16} />}
                                </div>
                                <span className="font-medium text-zinc-300">{post.author || "Anonymous"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{new Date(post.$createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                            </div>

                            {isAuthor && (
                                <div className="flex items-center gap-3 ml-auto">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-white/5" className="px-4 py-2 border border-white/10 flex items-center gap-2">
                                            <Edit size={16} />
                                            <span>Edit</span>
                                        </Button>
                                    </Link>
                                    <Button
                                        bgColor="bg-red-500/10"
                                        textColor="text-red-500"
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-4 py-2 border border-red-500/20 flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={16} />
                                        <span>Delete</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.article
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-invert prose-indigo max-w-none text-zinc-300 leading-relaxed text-lg"
                    >
                        {parse(post.content)}
                    </motion.article>
                </div>
            </Container>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Post"
                message={`Are you sure you want to delete this post? This action cannot be undone and will permanently remove your story from ${conf.projectName}.`}
                confirmText="Yes, delete post"
                type="danger"
            />
        </div>
    );
}

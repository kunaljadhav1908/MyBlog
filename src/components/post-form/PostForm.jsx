import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image as ImageIcon, X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "../../utils/cn";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            stutas: post?.stutas || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (data) => {
        setError("");
        setLoading(true);
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image[0]) {
                    setError("Please upload a featured image");
                    setLoading(false);
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("PostForm :: submit :: error", error);
            setError(error.message || "An error occurred while saving the post");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-y-6">
            <div className="w-full lg:w-2/3 lg:px-4 space-y-6">
                <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
                    <Input
                        label="Post Title"
                        placeholder="Enter a captivating title"
                        {...register("title", { required: true })}
                    />
                    <div className="relative">
                        <Input
                            label="Slug (Auto-generated)"
                            placeholder="post-slug"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        <Sparkles className="absolute right-4 bottom-3 text-blue-500/50 w-4 h-4" />
                    </div>
                </div>

                <div className="glass p-1 rounded-3xl border border-white/5 overflow-hidden">
                    <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            <div className="w-full lg:w-1/3 lg:px-4 space-y-6">
                <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-zinc-400 pl-1">
                            Featured Image
                        </label>

                        <div className="relative aspect-video rounded-2xl border-2 border-dashed border-white/10 overflow-hidden bg-white/5 group hover:border-indigo-500/50 transition-colors">
                            <AnimatePresence mode='wait'>
                                {imagePreview || post ? (
                                    <motion.div
                                        key="preview"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full w-full relative"
                                    >
                                        <img
                                            src={imagePreview || appwriteService.getFilePreview(post?.featuredImage)}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-sm font-medium">Change Image</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full w-full flex flex-col items-center justify-center gap-3 text-zinc-500"
                                    >
                                        <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all">
                                            <ImageIcon size={32} />
                                        </div>
                                        <p className="text-xs">PNG, JPG, GIF (Max. 2MB)</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", {
                                    required: !post,
                                    onChange: (e) => handleImageChange(e)
                                })}
                            />
                        </div>
                    </div>

                    <Select
                        options={["active", "inactive"]}
                        label="Visibility"
                        {...register("stutas", { required: true })}
                    />

                    <Button
                        type="submit"
                        bgColor={post ? "bg-emerald-500" : "bg-blue-600"}
                        className="w-full py-4 text-lg"
                    >
                        {post ? "Update Post" : "Publish Now"}
                    </Button>
                </div>
            </div>
        </form>
    );
}


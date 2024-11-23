import React from 'react';
import { Clock, User, Heart, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { BlogCardProps, Post } from '@/types/blog.types';
import { motion } from 'framer-motion';

const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').trim();
};

export function BlogCard({ post, onClick }: BlogCardProps) {
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [showShareMenu, setShowShareMenu] = React.useState(false);

    const getBackgroundImage = () => {
        const fieldImage = post.fields?.find((field) =>
            field.relationEntities?.medias?.[0]?.urls?.medium
        )?.relationEntities?.medias?.[0]?.urls?.medium;

        return fieldImage || post.imageUrl || '';
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: stripHtmlTags(post.description || ''),
                    url: `/post/${post.id}`,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            setShowShareMenu(!showShareMenu);
        }
    };

    const backgroundImage = getBackgroundImage();
    const cleanDescription = stripHtmlTags(post.shortContent || post.description || '');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="group overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image Section with Fixed Aspect Ratio */}
                <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-blue-50 to-indigo-50">
                    {backgroundImage ? (
                        <img
                            src={backgroundImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.title)}&background=3b82f6&color=fff&size=400`;
                            }}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl">✍️</span>
                        </div>
                    )}

                    {/* Image Overlay for Better Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 text-sm font-medium bg-white/90 backdrop-blur-sm rounded-full text-blue-600">
                            {post.space.name}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsBookmarked(!isBookmarked);
                            }}
                        >
                            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                            aria-label="share"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleShare();
                            }}
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Content Section with Proper Spacing */}
                <CardContent className="p-6 pt-8" onClick={() => onClick?.(post.id)}>
                    <div className="space-y-6">  {/* Increased space between sections */}
                        <div className="space-y-3">  {/* Increased space between title and description */}
                            <h3 className="font-semibold text-xl leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                                {post.description}
                            </p>
                        </div>

                        {/* Metadata Section */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-3">
                                {post.author.avatar ? (
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=e2e8f0&color=64748b`;
                                        }}
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ring-2 ring-white">
                                        <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">
                                        {post.author.name}
                                    </span>
                                    <time className="text-xs text-gray-500" dateTime={post.createdAt}>
                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="text-xs">{post.readTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span data-testid="comments-count" className="text-xs">{post.commentsCount || 0}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Heart
                                        className={`w-3.5 h-3.5 ${post.reactionsCount > 0 ? 'fill-red-500 text-red-500' : ''}`}
                                    />
                                    <span data-testid="reactions-count" className="text-xs">{post.reactionsCount || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

}

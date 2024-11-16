import React from 'react';
import { Clock, User, Heart } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { BlogCardProps } from '@/types/blog.types';

const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>?/gm, '');
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

export function BlogCard({ post, onClick }: BlogCardProps) {
    const readTime = calculateReadTime(post.description || post.shortContent || '');

    return (
        <Card
            className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => onClick?.(post.id)}
        >
            <div className="relative w-full h-48">
                {post.imageUrl ? (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-100 flex items-center justify-center">
                        <div className="text-2xl font-bold text-white/80">
                            {post.space.name}
                        </div>
                    </div>
                )}
            </div>

            <CardHeader className="space-y-2">
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.space.name}
                    </span>
                </div>
                <h3 className="font-bold text-xl leading-tight line-clamp-2 text-gray-900">
                    {post.title}
                </h3>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <p className="text-gray-600 line-clamp-2 text-sm">
                        {post.shortContent || post.description || 'No description available'}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-2">
                            {post.owner?.member?.profilePicture?.urls?.thumb ? (
                                <img
                                    src={post.owner.member.profilePicture.urls.thumb}
                                    alt={post.owner?.member?.displayName || 'Anonymous'}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="w-4 h-4 text-gray-500" />
                                </div>
                            )}
                            <span className="text-sm font-medium text-gray-700">
                                {post.owner?.member?.displayName || 'Anonymous'}
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{readTime} min read</span>
                            </div>
                            <button
                                className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle reaction click (you can implement the logic here)
                                }}
                            >
                                <Heart className={`w-5 h-5 ${post.reactionsCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                                <span className="text-sm">{post.reactionsCount || 0}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

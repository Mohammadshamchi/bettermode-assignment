import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/queries/post';
import {
    Facebook,
    Twitter,
    Linkedin,
    MessageCircle,
    Clock,
    Calendar,
    Heart,
    ThumbsUp,
    Smile,
    ThumbsDown,
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import React from 'react';

const reactionIcons: { [key: string]: JSX.Element } = {
    Love: <Heart className="h-4 w-4 mr-1 text-red-500" />,
    Like: <ThumbsUp className="h-4 w-4 mr-1" />,
    Dislike: <ThumbsDown className="h-4 w-4 mr-1" />,
    Happy: <Smile className="h-4 w-4 mr-1" />,
};

export const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useQuery(GET_POST, {
        variables: { id },
        skip: !id,
    });

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                Error loading post
            </div>
        );
    if (!data?.post)
        return (
            <div className="min-h-screen flex items-center justify-center">
                Post not found
            </div>
        );

    const post = data.post;

    // Helper function to calculate read time
    function calculateReadTime(content: string): number {
        const wordsPerMinute = 200;
        const text = content.replace(/<[^>]*>?/gm, '');
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[60vh]">
                {post.thumbnail?.url ? (
                    <img
                        src={post.thumbnail.url}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800" />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    {post.shortContent && (
                        <p
                            className="text-xl text-white/90 max-w-2xl"
                            dangerouslySetInnerHTML={{ __html: post.shortContent }}
                        />
                    )}
                </div>
            </div>

            {/* Author & Meta Info */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-4">
                        <Avatar
                            src={post.owner?.member?.profilePicture?.urls?.thumb}
                            alt={post.owner?.member?.displayName}
                            className="h-12 w-12"
                        />
                        <div>
                            <div className="font-medium text-gray-900">
                                {post.owner?.member?.displayName || 'Anonymous'}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {calculateReadTime(post.description)} min read
                                </span>
                                <span className="flex items-center">
                                    <MessageCircle className="h-4 w-4 mr-1" />
                                    {post.reactionsCount} reactions
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <article className="prose prose-lg max-w-none mb-12">
                        <div
                            dangerouslySetInnerHTML={{ __html: post.description }}
                        />
                    </article>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3">Topics</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag: any) => (
                                    <Button
                                        key={tag.id}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            // Handle tag click
                                        }}
                                    >
                                        {tag.title}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share & Reactions */}
                    <div className="flex items-center justify-between pt-8 border-t">
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <Facebook className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                            <Button variant="outline" size="sm">
                                <Twitter className="h-4 w-4 mr-2" />
                                Tweet
                            </Button>
                            <Button variant="outline" size="sm">
                                <Linkedin className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            {post.reactions?.map((reaction: any) => (
                                <Button
                                    key={reaction.reaction}
                                    variant="ghost"
                                    size="sm"
                                >
                                    {reactionIcons[reaction.reaction] || reaction.reaction}{' '}
                                    {reaction.count}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogPostPage;

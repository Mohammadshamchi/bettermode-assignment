import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/queries/posts';
import {
    Calendar,
    Clock,
    Heart,
    MessageSquare,
    Bookmark,
    ChevronLeft,
    Twitter,
    Facebook,
    Linkedin,
    Copy,
    Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/Card';
import { CommentSection } from '@/components/blog/CommentSection';
import { PostLikeButton } from '@/components/blog/PostLikeButton';

// Add an interface for the field structure
interface Field {
    key: string;
    value: string;
    // Add other field properties if they exist
}

// Add this interface to src/types/blog.types.ts
export interface Reaction {
    reaction: string;
    count: number;
}

// Then update the Post interface to include proper typing for reactions
export interface Post {
    id: string;
    title: string;
    description: string;
    shortContent: string;
    createdAt: string;
    status: "PUBLISHED" | "DRAFT" | "HIDDEN";
    url: string;
    relativeUrl: string;
    reactionsCount: number;
    commentsCount?: number;
    fields?: {
        key: string;
        value: string;
        relationEntities?: {
            medias?: Array<{
                url?: string;
                urls?: {
                    medium?: string;
                    small?: string;
                };
            }>;
        };
    }[];
    tags?: Array<{
        id: string;
        title: string;
    }>;
    thumbnail?: {
        url?: string;
        urls?: {
            medium?: string;
            small?: string;
        };
    };
    reactions: Reaction[];
    space: {
        id: string;
        name: string;
    };
    owner?: {
        member?: {
            displayName: string;
            profilePicture?: {
                urls?: {
                    thumb?: string;
                };
            };
        };
    };
}

const BlogPostPage = () => {
    const [copied, setCopied] = useState(false);
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useQuery(GET_POST, {
        variables: { id },
        skip: !id
    });

    const getFullContent = () => {
        if (!data?.post) return '';
        // Helper function to clean content
        const cleanContent = (content: string) => {
            return content
                .replace(/^["']|["']$/g, '') // Remove leading/trailing quotes
                .replace(/\\n/g, '\n') // Replace string newlines with actual newlines
                .replace(/\\"|\\'|""/g, '"') // Clean up escaped quotes
                .trim();
        };

        // Check all possible content sources and clean them
        const contentField = data.post.fields?.find((field: Field) => field.key === 'content');
        if (contentField) return cleanContent(contentField.value);

        const contentMapping = data.post.mappingFields?.find((field: { key: string }) =>
            field.key === 'content'
        );
        if (contentMapping) return cleanContent(contentMapping.value);

        const mainContent = data.post.textContent || data.post.shortContent || '';
        return cleanContent(mainContent);
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-10 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !data?.post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {error ? 'Error loading post' : 'Post not found'}
                    </h2>
                    <p className="text-gray-600 max-w-md">
                        {error
                            ? "We encountered an error while loading this article. Please try again later."
                            : "The article you're looking for doesn't exist or has been removed."}
                    </p>
                    <Button
                        onClick={() => window.history.back()}
                        variant="outline"
                        className="mt-4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const { post } = data;
    const readTime = Math.ceil(getFullContent().split(' ').length / 200);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900"
                            onClick={handleShare}
                        >
                            {copied ? (
                                <Check className="w-4 h-4 mr-2 text-green-500" />
                            ) : (
                                <Copy className="w-4 h-4 mr-2" />
                            )}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <Bookmark className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="mb-8">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                {post.space?.name}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-xl text-blue-50 mb-8 leading-relaxed">
                            {post.description}
                        </p>
                        <div className="flex items-center justify-center space-x-8 text-blue-50">
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 opacity-75" />
                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 opacity-75" />
                                {readTime} min read
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Author Card */}
                    <Card className="mb-12 overflow-hidden border-none shadow-lg">
                        <CardContent className="flex items-center space-x-4 p-8 bg-gradient-to-br from-gray-50 to-white">
                            <Avatar className="w-20 h-20 border-2 border-white shadow-md">
                                <AvatarImage
                                    src={post.owner?.member?.profilePicture?.urls?.thumb}
                                    alt={post.owner?.member?.displayName}
                                />
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-medium">
                                    {post.owner?.member?.displayName?.[0] || 'A'}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {post.owner?.member?.displayName}
                                </h3>
                                <p className="text-gray-600">
                                    Posted in {post.space?.name}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content */}
                    <article className="prose prose-lg max-w-none mb-12">
                        <div
                            dangerouslySetInnerHTML={{ __html: getFullContent() }}
                            className="prose-headings:text-gray-900 prose-headings:font-bold 
                                     prose-p:text-gray-700 prose-p:leading-relaxed
                                     prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                     prose-strong:text-gray-900 prose-strong:font-semibold
                                     prose-ul:list-disc prose-ol:list-decimal
                                     prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                                     prose-blockquote:pl-4 prose-blockquote:italic
                                     prose-img:rounded-lg prose-img:shadow-md"
                        />
                    </article>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Topics</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag: { id: string; title: string }) => (
                                    <Button
                                        key={tag.id}
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full bg-blue-50/50 text-blue-700 border-blue-100 
                                                 hover:bg-blue-100 hover:border-blue-200 transition-colors"
                                    >
                                        {tag.title}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Engagement Bar */}
                    <Card className="shadow-lg border-none bg-gradient-to-br from-gray-50 to-white">
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-6">
                                    <PostLikeButton
                                        postId={post.id}
                                        initialCount={post.reactionsCount || 0}
                                        initialLiked={post.reactions?.some((r: { reaction: string }) => r.reaction === 'like')}
                                    />
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-2"
                                        onClick={() => {
                                            const commentsSection = document.getElementById('comments-section');
                                            commentsSection?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        <MessageSquare className="w-5 h-5" />
                                        <span>Comments</span>
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-600 hover:text-white hover:bg-blue-600"
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`)}
                                    >
                                        <Twitter className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-800 hover:text-white hover:bg-blue-800"
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}
                                    >
                                        <Facebook className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-700 hover:text-white hover:bg-blue-700"
                                        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`)}
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Comments Section */}
                    <div id="comments-section" className="mt-8">
                        {data?.post && !loading && !error && (
                            <CommentSection postId={data.post.id} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogPostPage;

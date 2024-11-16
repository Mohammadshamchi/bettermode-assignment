import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/queries/post';
import { Facebook, Twitter, Linkedin, Clock, Calendar, Heart } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useQuery(GET_POST, {
        variables: { id },
        skip: !id
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading post</div>;
    if (!data?.post) return <div>Post not found</div>;

    const post = data.post;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 py-24">
                <div className="absolute inset-0 bg-blue-500 opacity-20"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg...%3E\")" }}
                ></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {post.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
                        {post.description}
                    </p>
                </div>
            </div>

            {/* Author Section */}
            <div className="bg-muted py-6">
                <div className="container mx-auto px-4 flex items-center space-x-4">
                    <Avatar
                        src={post.owner?.member?.profilePicture?.urls?.thumb}
                        alt={post.owner?.member?.displayName}
                        fallback={post.owner?.member?.displayName?.[0]}
                    />
                    <div>
                        <h2 className="font-semibold">{post.owner?.member?.displayName}</h2>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {post.readTime} min read
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <main className="lg:w-2/3">
                        <article className="prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: post.shortContent }} />
                        </article>

                        {/* Tags Section */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags?.map((tag) => (
                                    <Button key={tag.id} variant="outline" size="sm">
                                        {tag.title}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Social Share and Reactions */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-2">Share this post</h3>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon">
                                    <Facebook className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Twitter className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Reaction Section */}
                        <div className="flex items-center mt-4">
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
                    </main>
                </div>
            </div>
        </div>
    );
};

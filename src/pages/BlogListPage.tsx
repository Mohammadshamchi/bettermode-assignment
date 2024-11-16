import React, { memo } from 'react';
import { Book } from 'lucide-react';
import BlogGrid from '@/components/blog/BlogGrid';
import { Header } from '@/components/Header';
import { usePosts } from '../hooks/usePosts';

export const BlogListPage = memo(() => {
    const { posts, loading, error, hasMore, loadMore } = usePosts(12);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <div className="text-center text-red-600">
                        Error loading posts. Please try again later.
                    </div>
                </main>
            </div>
        );
    }

    const postsWithThumbnails = React.useMemo(() => {
        return posts.map(post => ({
            ...post,
            thumbnailUrl: post.thumbnail?.urls?.medium || post.thumbnail?.url || null
        }));
    }, [posts]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <Book className="h-10 w-10 text-blue-600 mr-4" />
                    <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
                </div>

                <BlogGrid
                    posts={postsWithThumbnails}
                    loading={loading}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                />
            </main>
        </div>
    );
});

BlogListPage.displayName = 'BlogListPage';

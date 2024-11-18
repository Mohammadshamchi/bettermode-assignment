// src/pages/BlogListPage.tsx
import React, { memo } from 'react';
import { Book } from 'lucide-react';
import BlogGrid from '@/components/blog/BlogGrid';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/ui/SearchBar';
import { SearchSkeleton } from '@/components/ui/SearchSkeleton';
import { usePosts } from '../hooks/usePosts';

export const BlogListPage = memo(() => {
    const { posts, loading, error, hasMore, loadMore, handleSearch, searchQuery } = usePosts(12);

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

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center">
                            <Book className="h-10 w-10 text-blue-600 mr-4" />
                            <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
                        </div>
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    {loading && !posts.length ? (
                        <SearchSkeleton />
                    ) : (
                        <BlogGrid
                            posts={posts}
                            loading={loading}
                            hasMore={hasMore}
                            onLoadMore={loadMore}
                        />
                    )}

                    {posts.length === 0 && !loading && searchQuery && (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No posts found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
});

BlogListPage.displayName = 'BlogListPage';

import { Book } from 'lucide-react';
import { BlogGrid } from '../components/blog/BlogGrid';
import { usePosts } from '../hooks/usePosts';
import { Header } from '../layouts/Header';

export function BlogListPage() {
    const { posts, loading, error, hasMore, loadMore } = usePosts(12); // Load 12 posts initially

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
                <div className="flex items-center mb-8">
                    <Book className="h-10 w-10 text-blue-600 mr-4" />
                    <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
                </div>

                <BlogGrid
                    posts={posts}
                    loading={loading}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                />
            </main>
        </div>
    );
}

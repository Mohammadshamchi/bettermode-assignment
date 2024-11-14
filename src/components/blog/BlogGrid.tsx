import { BlogCard } from './BlogCard'
import { BlogGridProps } from '@/types/blog.types'
import { Button } from '@/components/ui/button' // Add this import

export function BlogGrid({ posts, loading, onLoadMore, hasMore }: BlogGridProps) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <BlogCard
                        key={post.id}
                        post={post}
                        onClick={(id) => {
                            window.location.href = `/post/${id}`;
                        }}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={onLoadMore}
                        disabled={loading}
                        variant="primary"
                        size="lg"
                        className="w-full md:w-auto"
                    >
                        {loading ? 'Loading...' : 'Load More Posts'}
                    </Button>
                </div>
            )}
        </div>
    )
}

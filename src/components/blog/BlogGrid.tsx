import { memo } from 'react';
import { BlogGridProps, BlogPost } from '@/types/blog.types'
import { BlogCard } from './BlogCard'

const BlogGrid = memo(({ posts, loading, onLoadMore, hasMore }: BlogGridProps) => {
    const postIds = posts.map((post: BlogPost) => post.id).join(',');

    return (
        <div className="space-y-8" key={postIds}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: BlogPost) => (
                    <BlogCard
                        key={post.id}
                        post={post}
                        onClick={(id: string) => {
                            window.location.href = `/post/${id}`
                        }}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={onLoadMore}
                        disabled={loading}
                        className="px-6 py-3 text-base font-medium text-white bg-[#4361ee] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? 'Loading...' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    )
})

BlogGrid.displayName = 'BlogGrid';

export default BlogGrid;

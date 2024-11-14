import { Clock } from 'lucide-react';
import { BlogCardProps } from '../../types/blog.types';

export function BlogCard({ post, onClick }: BlogCardProps) {
    return (
        <div
            onClick={() => onClick?.(post.id)}
            className="max-w-sm rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        >
            <div className="h-48 bg-gradient-to-r from-blue-400 to-white relative">
                <div className="absolute inset-0 bg-pattern opacity-50"></div>
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover mix-blend-overlay"
                />
            </div>

            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full"
                        >
                            {category}
                        </span>
                    ))}
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-700">{post.author.name}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

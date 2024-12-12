import { useState, useEffect, useCallback } from 'react';
import { PostsAPI } from '../lib/api';
import type { BlogPost, Post } from "../types/blog.types";

const transformPost = (post: Post): BlogPost => {
    return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        description: post.content.substring(0, 200) + "...",
        shortContent: post.content,
        createdAt: post.created_at,
        status: post.published ? "PUBLISHED" : "DRAFTS",
        url: `/posts/${post.slug}`,
        relativeUrl: `/posts/${post.slug}`,
        thumbnail: post.thumbnail,
        imageUrl: post.thumbnail,
        space: {
            id: "1",
            name: "Blog"
        },
        reactionsCount: 0,
        reactions: [],
        readTime: `${Math.ceil(post.content.split(' ').length / 200)} min read`
    }
};
export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await PostsAPI.getAllPosts();
            setPosts(response.data);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError(err instanceof Error ? err : new Error("Failed to fetch posts"))
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts])
    
    return {
        posts: posts.map(transformPost),
        loading,
        error,
        hasMore: false,
        loadMore: () => { }
    };
}
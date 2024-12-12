import { useState, useCallback, useMemo, useEffect } from "react";
import axios from 'axios';
import { BlogPost,Post } from "../types/blog.types";

export interface Post {
    id: number;
    title: string;
    slug: string;
    author: number;
    thumbnail: string;
    content: string;
    created_at: string;
    updated_at: string;
    published: boolean;
}

const transformPost = (post: Post): BlogPost => {
    return {
        id: post.id.toString(),
        title: post.title,
        slug:post.slug,
        description: post.content.substring(0, 200) + "...",
        shortContent: post.content,
        createdAt: post.created_at,
        status: post.published ? "PUBLISHED" : "DRAFT",
        url: `/post/${post.slug}`,
        relativeUrl: `/post/${post.slug}`,
        thumbnail: post.thumbnail,
        imageUrl: post.thumbnail,
        space: {
            id: '1',
            name:"Blog"
        },
        reactionsCount: 0,
        reactions: [],
        author: {
            name: `Author ${post.author}`,
            avatar:'/default-avatar.png'
        },
        categories: [],
        readTime:`${Math.ceil(post.content.split(' ').length/200)} min read`
        
    }
}

export function usePosts(limit: number = 10) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://aiekip.com/api/posts/");
                setPosts(response.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError(err instanceof Error ? err : new Error("Failed to fetch posts"));
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
    }, []);

    const filteredPosts = posts.filter(post =>
        searchQuery ? 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
            : true
    )

    return {
        posts: filteredPosts.map(transformPost), loading, error, handleSearch, searchQuery, hasMore: false,
        loadMore: () => { }
    };
}
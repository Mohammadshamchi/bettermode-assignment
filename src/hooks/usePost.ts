import { useQuery } from '@apollo/client';
import { GET_POST } from '../graphql/queries/post';
import type { BlogPost } from '../types/blog.types';

export function usePost(id: string) {
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const post: BlogPost | null = data?.post ? {
    id: data.post.id,
    title: data.post.title,
    description: data.post.description || '',
    shortContent: data.post.shortContent || '',
    createdAt: data.post.createdAt,
    reactionsCount: data.post.reactionsCount || 0,
    status: data.post.status,
    url: data.post.url || '',
    relativeUrl: data.post.relativeUrl || '',
    author: {
      name: data.post.owner?.member?.displayName || 'Anonymous',
      avatar: data.post.owner?.member?.profilePicture?.urls?.thumb || '',
    },
    space: data.post.space || { id: '', name: '' },
    imageUrl: data.post.thumbnail?.urls?.medium || '',
    categories: data.post.tags?.map((tag: any) => tag.title) || [],
    readTime: '5 min',
    reactions: data.post.reactions || [],
  } : null;

  return {
    post,
    loading,
    error,
  };
} 

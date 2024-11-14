import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import type { BlogPost } from '../types/blog.types';

export function usePosts(limit: number = 10) {
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      limit,
    },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error('GraphQL Error:', {
        message: error.message,
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError,
      });
    },
  });

  const posts: BlogPost[] = data?.posts?.edges?.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    description: edge.node.description || '',
    shortContent: edge.node.shortContent || '',
    createdAt: edge.node.createdAt,
    reactionsCount: edge.node.reactionsCount || 0,
    status: edge.node.status,
    url: '',
    relativeUrl: '',
    author: {
      name: edge.node.user?.name || 'Anonymous',
      avatar: edge.node.user?.avatarUrl || '',
    },
    space: edge.node.space || { id: '', name: '' },
    imageUrl: '',
    categories: [],
    readTime: '5 min',
    reactions: edge.node.reactions?.map((r: any) => ({
      reaction: r.reaction,
      count: r.count
    })) || [],
  })) || [];

  const loadMore = async () => {
    if (!hasMore || loading || !data?.posts?.pageInfo?.endCursor) return;

    try {
      const result = await fetchMore({
        variables: {
          after: data.posts.pageInfo.endCursor,
          limit,
        },
      });

      setHasMore(result.data.posts.pageInfo.hasNextPage);
    } catch (err) {
      console.error('Error loading more posts:', err);
    }
  };

  return {
    posts,
    loading,
    error,
    hasMore: data?.posts?.pageInfo?.hasNextPage ?? false,
    loadMore,
  };
}

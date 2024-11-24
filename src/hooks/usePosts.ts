import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries/posts';
import { transformPost } from '../utils/post-utils';
import { PostListOrderByEnum } from '../types/blog.types';
import type { 
  BlogPostsResponse, 
  PostsQueryVariables,
  BlogPost,
  Post 
} from '../types/blog.types';

export function usePosts(limit: number = 10) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, loading, error, fetchMore } = useQuery<BlogPostsResponse, PostsQueryVariables>(
    GET_POSTS,
    {
      variables: {
        limit,
        orderBy: PostListOrderByEnum.createdAt,
        reverse: true,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    }
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const loadMore = useCallback(async () => {
    if (!data?.posts?.pageInfo?.hasNextPage || loading) return;

    try {
      await fetchMore({
        variables: {
          after: data.posts.pageInfo.endCursor,
          limit,
          orderBy: PostListOrderByEnum.createdAt,
          reverse: true,
        },
      });
    } catch (err) {
      console.error('Error loading more posts:', err);
    }
  }, [data?.posts?.pageInfo, loading, fetchMore, limit]);

  const posts = useMemo(() => {
    if (!data?.posts?.edges) return [];
    
    const uniquePosts = new Map();
    data.posts.edges.forEach(edge => {
      if (!uniquePosts.has(edge.node.id)) {
        uniquePosts.set(edge.node.id, transformPost(edge.node));
      }
    });
    
    const allPosts = Array.from(uniquePosts.values());
    
    if (searchQuery) {
      return allPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return allPosts;
  }, [data?.posts?.edges, searchQuery]);

  return {
    posts,
    loading,
    error,
    hasMore: data?.posts?.pageInfo?.hasNextPage ?? false,
    loadMore,
    handleSearch,
    searchQuery,
  };
}

// hooks/usePosts.ts
import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries/posts';
import type { BlogPost, BlogPostsResponse, Post } from '../types/blog.types';

const stripHtmlTags = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

const calculateActualReadTime = (content: string): string => {
  // Strip HTML tags and clean the text
  const cleanText = stripHtmlTags(content);
  
  // Count words (split by whitespace)
  const words = cleanText.split(/\s+/).length;
  
  // Calculate minutes (average reading speed is 200-250 words per minute)
  // Use 200 words per minute for a more conservative estimate
  const minutes = Math.max(1, Math.ceil(words / 200));
  
  // Return formatted string
  return `${minutes} min read`;
};

const getImageUrl = (post: Post): string => {
  // Check for media in fields first
  const fieldImage = post.fields?.find(field => 
    field.relationEntities?.medias?.[0]?.urls?.medium
  )?.relationEntities?.medias?.[0]?.urls?.medium;

  // If no field image, check thumbnail
  const thumbnailImage = post.thumbnail?.urls?.medium || post.thumbnail?.url;

  // Return the first available image or empty string
  return fieldImage || thumbnailImage || '';
};

export function usePosts(limit: number = 10) {
  const { data, loading, error, fetchMore } = useQuery<BlogPostsResponse>(GET_POSTS, {
    variables: {
      limit,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const transformPost = (node: Post): BlogPost => {
    // Clean up content
    const description = stripHtmlTags(node.description || '');
    const shortContent = stripHtmlTags(node.shortContent || '');
    const content = shortContent || description;

    return {
      id: node.id,
      title: node.title,
      description: description,
      shortContent: shortContent,
      createdAt: node.createdAt,
      reactionsCount: node.reactionsCount || 0,
      status: node.status,
      url: node.url || '',
      relativeUrl: node.relativeUrl || '',
      author: {
        name: node.owner?.member?.displayName || 'Anonymous',
        avatar: node.owner?.member?.profilePicture?.urls?.thumb || '',
      },
      space: node.space || { id: '', name: '' },
      imageUrl: getImageUrl(node),
      categories: [], // Could be populated from tags or other metadata if available
      readTime: calculateActualReadTime(content),
      reactions: node.reactions?.map(r => ({
        reaction: r.reaction,
        count: r.count
      })) || [],
      fields: node.fields || [], // Preserve fields for potential future use
    };
  };

  const posts = React.useMemo(() => {
    if (!data?.posts?.edges) return [];
    
    // Create a Map to ensure uniqueness by ID
    const uniquePosts = new Map();
    
    data.posts.edges.forEach(edge => {
      if (!uniquePosts.has(edge.node.id)) {
        uniquePosts.set(edge.node.id, transformPost(edge.node));
      }
    });
    
    return Array.from(uniquePosts.values());
  }, [data?.posts?.edges]);

  const loadMore = async () => {
    if (!data?.posts?.pageInfo?.hasNextPage || loading) return;

    try {
      await fetchMore({
        variables: {
          after: data.posts.pageInfo.endCursor,
          limit,
        },
      });
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

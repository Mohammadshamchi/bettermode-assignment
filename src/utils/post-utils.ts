// src/utils/post-utils.ts
import type { Post } from '../types/blog.types';

export const stripHtmlTags = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const calculateActualReadTime = (content: string): string => {
  const cleanText = stripHtmlTags(content);
  const words = cleanText.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

export const getImageUrl = (post: Post): string => {
  const fieldImage = post.fields?.find(field => 
    field.relationEntities?.medias?.[0]?.urls?.medium
  )?.relationEntities?.medias?.[0]?.urls?.medium;

  const thumbnailImage = post.thumbnail?.urls?.medium || post.thumbnail?.url;
  return fieldImage || thumbnailImage || '';
};

export const transformPost = (node: Post) => {
  const description = stripHtmlTags(node.description || '');
  const shortContent = stripHtmlTags(node.shortContent || '');
  const content = shortContent || description;

  return {
    id: node.id,
    title: node.title,
    description,
    shortContent,
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
    categories: node.tags?.map(tag => tag.title) || [],
    readTime: calculateActualReadTime(content),
    reactions: node.reactions?.map(r => ({
      reaction: r.reaction,
      count: r.count
    })) || [],
    fields: node.fields || [],
  };
};

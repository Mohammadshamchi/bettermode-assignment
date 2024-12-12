import { useState, useCallback, useEffect } from 'react';
import { CommentsAPI } from '../lib/api';


import type { Comment } from '../types/comment.types';

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isReplying, setIsReplying] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await CommentsAPI.getComments(postId);
      setComments(response.data || []);
    } catch (err) {
      console.error("Error fetching Comments: ", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch comments'));
    } finally {
      setLoading(false);
    }
  }, [postId]);
  
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (content: string, parentId?: string) => {
    try {
      const response = await CommentsAPI.createComment(postId, {
        content,
        parent: parentId,
      });

      setComments(prev => [response.data, ...prev]);
      setIsReplying(false);
      return response.data;
    } catch (err) {
      console.error("Error adding comment", err);
      throw err;
    }
  }
  return {
    comments,
    loading,
    error,
    addComment,
    isReplying,
    setIsReplying,
    hasMore: false,
    loadMore:()=>{}
  }
}

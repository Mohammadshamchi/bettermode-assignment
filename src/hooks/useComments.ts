import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS, ADD_COMMENT } from '@/graphql/queries/comments';
import type { Comment, CommentResponse } from '@/types/comment.types';

export function useComments(postId: string, limit: number = 10) {
  const [isReplying, setIsReplying] = useState(false);

  const { data, loading, error, fetchMore } = useQuery<CommentResponse>(GET_COMMENTS, {
    variables: {
      postId,
      limit,
      orderBy: "publishedAt",
      reverse: true
    },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error('Comments query error:', error);
    }
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    onError: (error) => {
      console.error('Add comment error:', error);
    },
    update: (cache, { data: newCommentData }) => {
      const existingComments = cache.readQuery<CommentResponse>({
        query: GET_COMMENTS,
        variables: { postId, limit }
      });

      if (existingComments && newCommentData?.createReply) {
        cache.writeQuery({
          query: GET_COMMENTS,
          variables: { postId, limit },
          data: {
            replies: {
              ...existingComments.replies,
              nodes: [newCommentData.createReply, ...existingComments.replies.nodes]
            }
          }
        });
      }
    }
  });

  const loadMore = async () => {
    if (!data?.replies.pageInfo.hasNextPage || loading) return;

    await fetchMore({
      variables: {
        after: data.replies.pageInfo.endCursor,
      },
    });
  };

  return {
    comments: data?.replies.nodes || [],
    loading,
    error,
    hasMore: data?.replies.pageInfo.hasNextPage ?? false,
    loadMore,
    addComment,
    isReplying,
    setIsReplying,
  };
}

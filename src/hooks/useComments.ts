import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS, ADD_COMMENT } from '@/graphql/queries/comments';
import type { Comment, CommentResponse } from '@/types/comment.types';

export function useComments(postId: string) {
  const [isReplying, setIsReplying] = useState(false);
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    update(cache, { data: { createReply } }) {
      const existingComments = cache.readQuery<{ replies: CommentResponse['replies'] }>({
        query: GET_COMMENTS,
        variables: {
          postId,
          limit: 10,
          orderBy: "createdAt",
          reverse: true
        }
      });

      if (existingComments?.replies) {
        cache.writeQuery({
          query: GET_COMMENTS,
          variables: {
            postId,
            limit: 10,
            orderBy: "createdAt",
            reverse: true
          },
          data: {
            replies: {
              ...existingComments.replies,
              nodes: [createReply, ...existingComments.replies.nodes]
            }
          }
        });
      }
    }
  });
  const { data, loading, error, fetchMore } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
      limit: 10,
      orderBy: "createdAt",
      reverse: true
    }
  });

  const addComment = async (content: string, parentId?: string) => {
    try {
      const response = await addCommentMutation({
        variables: {
          postId,
          input: {
            postTypeId: "YZgUv70tONq4oqT",
            mappingFields: [
              {
                key: "content",
                type: "html",
                value: JSON.stringify(content)
              }
            ],
            publish: true,
            ...(parentId && { repliedToId: parentId })
          }
        }
      });
      setIsReplying(false);
      return response.data?.createReply;
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  };

  return {
    comments: data?.replies?.nodes || [],
    loading,
    error,
    addComment,
    hasMore: data?.replies?.pageInfo?.hasNextPage || false,
    loadMore: () => {
      if (data?.replies?.pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            after: data.replies.pageInfo.endCursor
          }
        });
      }
    },
    isReplying,
    setIsReplying
  };
}

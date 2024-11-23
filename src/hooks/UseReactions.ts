import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION, REMOVE_REACTION } from '@/graphql/mutations/reactions';

interface UseReactionsProps {
  postId: string;
  initialReactionState?: boolean;
}

export function useReactions({ 
  postId, 
  initialReactionState = false 
}: UseReactionsProps) {
  const [hasReacted, setHasReacted] = useState(initialReactionState);

  const [addReactionMutation, { loading: addLoading }] = useMutation(ADD_REACTION);
  const [removeReactionMutation, { loading: removeLoading }] = useMutation(REMOVE_REACTION);

  const toggleReaction = async () => {
    try {
      if (hasReacted) {
        await removeReactionMutation({
          variables: {
            postId,
            reaction: 'LIKE',
          }
        });
      } else {
        await addReactionMutation({
          variables: {
            postId,
            input: {
              type: 'LIKE'
            }
          }
        });
      }
      setHasReacted(!hasReacted);
    } catch (err) {
      console.error('Error toggling reaction:', err);
    }
  };

  return {
    hasReacted,
    toggleReaction,
    loading: addLoading || removeLoading
  };
}

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION, REMOVE_REACTION } from '@/graphql/mutations/reactions';

export function useReactions(postId: string) {
  const [addReactionMutation] = useMutation(ADD_REACTION);
  const [removeReactionMutation] = useMutation(REMOVE_REACTION);
  const [hasReacted, setHasReacted] = useState(false);

  const toggleReaction = async () => {
    try {
      if (hasReacted) {
        await removeReactionMutation({
          variables: {
            postId,
            reaction: "like"
          }
        });
      } else {
        await addReactionMutation({
          variables: {
            postId,
            reaction: "like"
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
    toggleReaction
  };
}

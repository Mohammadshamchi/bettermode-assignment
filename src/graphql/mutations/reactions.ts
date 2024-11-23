import { gql } from '@apollo/client';

export const ADD_REACTION = gql`
  mutation AddReaction($postId: ID!, $reaction: String!) {
    addReaction(postId: $postId, reaction: $reaction) {
      id
      reactionsCount
      reactions {
        reaction
        count
      }
    }
  }
`;

export const REMOVE_REACTION = gql`
  mutation RemoveReaction($postId: ID!, $reaction: String!) {
    removeReaction(postId: $postId, reaction: $reaction) {
      id
      reactionsCount
      reactions {
        reaction
        count
      }
    }
  }
`;

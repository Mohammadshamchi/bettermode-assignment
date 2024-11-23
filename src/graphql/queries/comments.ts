import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!, $limit: Int!, $after: String, $orderBy: PostListOrderByEnum, $reverse: Boolean) {
    replies(
      postId: $postId
      limit: $limit
      after: $after
      orderBy: $orderBy
      reverse: $reverse
    ) {
      nodes {
        id
        shortContent
        createdAt
        reactionsCount
        repliesCount
        totalRepliesCount
        fields {
          key
          value
        }
        owner {
          member {
            displayName
            name
            profilePicture {
              ... on Image {
                urls {
                  thumb
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $input: CreatePostInput!) {
    createReply(postId: $postId, input: $input) {
      id
      shortContent
      createdAt
      reactionsCount
      repliesCount
      totalRepliesCount
      fields {
        key
        value
      }
      owner {
        member {
          displayName
          name
          profilePicture {
            ... on Image {
              urls {
                thumb
              }
            }
          }
        }
      }
    }
  }
`;

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
        reactions {
          reaction
          count
          reacted
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
  mutation AddComment($postId: ID!, $content: String!) {
    createReply(
      input: {
        postId: $postId
        postTypeId: "YZgUv70tONq4oqT"
        fields: [
          {
            key: "content"
            value: $content
          }
        ]
      }
    ) {
      id
      shortContent
      createdAt
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($limit: Int!, $after: String) {
    posts(
      limit: $limit
      after: $after
      orderBy: createdAt
      reverse: true
    ) {
      edges {
        cursor
        node {
          id
          title
          description
          shortContent
          createdAt
          status
          url
          relativeUrl
          reactionsCount
          reactions {
            reaction
            count
          }
          space {
            id
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

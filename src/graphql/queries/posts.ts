import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($limit: Int!, $after: String) {
    posts(limit: $limit, after: $after, orderBy: createdAt, reverse: true) {
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
          fields {
            key
            value
            relationEntities {
              medias {
                ... on Image {
                  url
                  urls {
                    medium
                    small
                  }
                }
              }
            }
          }
          thumbnail {
            ... on Image {
              id
              url
              urls {
                medium
                small
              }
            }
          }
          reactions {
            reaction
            count
          }
          space {
            id
            name
          }
          owner {
            member {
              displayName
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

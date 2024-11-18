// src/graphql/queries/posts.ts
import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($limit: Int!, $after: String, $orderBy: PostListOrderByEnum!, $reverse: Boolean) {
    posts(
      limit: $limit,
      after: $after,
      orderBy: $orderBy,
      reverse: $reverse
    ) {
      edges {
        cursor
        node {
          id
          title
          description
          shortContent
          createdAt
          url
          relativeUrl
          reactionsCount
          reactions {
            reaction
            count
          }
          thumbnail {
            ... on Image {
              url
              urls {
                medium
                small
              }
            }
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
          space {
            id
            name
          }
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
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      shortContent
      textContent
      createdAt
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
`;

import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      shortContent
      textContent
      createdAt
      status
      url
      relativeUrl
      reactionsCount
      hasMoreContent
      fields {
        key
        value
        relationEntities {
          medias {
            ... on Image {
              url
              urls {
                full
                large
                medium
                small
              }
            }
          }
        }
      }
      mappingFields {
        key
        type
        value
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
      tags {
        id
        title
      }
    }
  }
`;

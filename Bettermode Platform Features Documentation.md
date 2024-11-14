# Bettermode Post List Implementation Guide

## Table of Contents
1. [Authentication](#authentication)
2. [API Endpoints](#api-endpoints)
3. [Data Structures](#data-structures)
4. [Basic Operations](#basic-operations)
5. [Implementation Examples](#implementation-examples)
6. [Error Handling](#error-handling)

## Authentication

### Getting Access Token
```graphql
query {
  tokens(networkDomain: "your-domain.bettermode.io") {
    accessToken
    role {
      name
      scopes
    }
  }
}
```

### Using the Token
Add to all GraphQL requests:
```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

## API Endpoints

### Base URL
- US Region: `https://api.bettermode.com/graphql`
- EU Region: `https://api.bettermode.de/graphql`

### Post List Query
```graphql
query GetPosts($cursor: String, $limit: Int!) {
  posts(
    limit: $limit
    after: $cursor
    orderBy: createdAt
    reverse: true
  ) {
    edges {
      node {
        id
        title
        description
        shortContent
        createdAt
        reactionsCount
        status
        url
        relativeUrl
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
```

## Data Structures

### Post Object
```typescript
interface Post {
  id: string;
  title: string;
  description: string;
  shortContent: string;
  createdAt: string;
  reactionsCount: number;
  status: "PUBLISHED" | "DRAFT" | "HIDDEN";
  url: string;
  relativeUrl: string;
  reactions: Reaction[];
  space: Space;
}

interface Reaction {
  reaction: string;
  count: number;
}

interface Space {
  id: string;
  name: string; // "Blog" | "Questions" | "Events" | "Discussions"
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface PostsResponse {
  edges: Array<{
    node: Post;
  }>;
  pageInfo: PageInfo;
}
```

## Basic Operations

### Fetching Posts
```javascript
async function fetchPosts(cursor = null) {
  const response = await fetch('https://api.bettermode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${YOUR_TOKEN}`
    },
    body: JSON.stringify({
      query: GET_POSTS_QUERY,
      variables: { 
        cursor,
        limit: 10
      }
    })
  });

  return await response.json();
}
```

### Filtering by Space
```graphql
query GetPosts($spaceIds: [ID!]) {
  posts(
    limit: 10
    spaceIds: $spaceIds
  ) {
    edges {
      node {
        # ... post fields
      }
    }
  }
}
```

### Sorting Options
```graphql
query GetPosts(
  $orderBy: PostListOrderByEnum,
  $reverse: Boolean
) {
  posts(
    limit: 10
    orderBy: $orderBy
    reverse: $reverse
  ) {
    # ... post fields
  }
}
```

## Implementation Examples

### React Component
```jsx
function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(null);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    
    try {
      const data = await fetchPosts(cursor);
      setPosts(prev => [...prev, ...data.posts.edges.map(e => e.node)]);
      setHasMore(data.posts.pageInfo.hasNextPage);
      setCursor(data.posts.pageInfo.endCursor);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

### Post Card Component
```jsx
function PostCard({ post }) {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.shortContent }} />
      <div className="metadata">
        <span>{post.space.name}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post.reactionsCount} reactions</span>
      </div>
    </div>
  );
}
```

## Error Handling

### Common Error Codes
- 401: Unauthorized - Invalid or expired token
- 403: Forbidden - Insufficient permissions
- 404: Not found
- 500: Internal server error

### Error Response Structure
```typescript
interface ErrorResponse {
  errors: Array<{
    code: string;
    message: string;
    extensions: {
      code: string;
      status: number;
    };
  }>;
}
```

### Error Handling Example
```javascript
async function handleRequest() {
  try {
    const response = await fetchPosts();
    if (response.errors) {
      // Handle GraphQL errors
      console.error('GraphQL Errors:', response.errors);
      return;
    }
    // Handle successful response
  } catch (error) {
    // Handle network/other errors
    console.error('Request failed:', error);
  }
}
```

## Best Practices

1. **Pagination**
   - Always implement infinite scroll or "Load More" for better UX
   - Cache previously loaded posts
   - Show loading states during fetches

2. **Performance**
   - Request only needed fields
   - Implement proper error boundaries
   - Cache responses when appropriate

3. **User Experience**
   - Show loading states
   - Handle errors gracefully
   - Provide meaningful error messages
   - Implement optimistic updates for reactions

4. **Security**
   - Never expose tokens in client-side code
   - Implement proper token refresh mechanism
   - Validate user permissions before actions

## Support Resources

- [Bettermode API Documentation](https://developers.bettermode.com/)
- [GraphQL Documentation](https://api.bettermode.com/graphql)
- Support Email: support@bettermode.com

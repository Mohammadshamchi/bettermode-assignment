# Bettermode Blog Project Documentation

## 🚀 Project Overview

A modern React-based blog platform integrated with the Bettermode API, featuring a responsive design, infinite scroll, and rich content management capabilities.

## 🛠 Tech Stack

- **Frontend Framework**: React 18.3.1 + TypeScript 5.6.2
- **Build Tool**: Vite 5.4.10
- **Data Management**: Apollo Client 3.11.10
- **Styling**: TailwindCSS 3.4.14 + Framer Motion 11.11.17
- **Routing**: React Router DOM 6.28.0
- **UI Components**: DaisyUI 4.12.14
- **API**: Bettermode GraphQL API

## 🎨 UI Components

- **Button**: Customizable button with variants (ghost, outline, default)
- **Card**: Flexible card layout system with header and content sections
- **Avatar**: User avatar component with fallback support
- **BlogCard**: Rich blog post preview with social interactions
- **BlogGrid**: Responsive grid layout with infinite scroll

## 📁 Project Structure

```
src/
├── components/
│   ├── blog/         # Blog-specific components
│   └── ui/           # Reusable UI components
├── graphql/
│   ├── client.ts     # Apollo client configuration
│   └── queries/      # GraphQL queries
├── hooks/            # Custom React hooks
├── pages/            # Route components
├── styles/           # Global styles
├── types/            # TypeScript definitions
└── lib/             # Utility functions
```

## 🎯 Key Features

### Blog List View

- Responsive grid layout with infinite scroll
- Interactive post cards with:
  - Dynamic image handling
  - Author information
  - Read time calculation
  - Reaction system
  - Social sharing

Reference implementation:

```5:35:src/components/blog/BlogGrid.tsx
const BlogGrid = memo(({ posts, loading, onLoadMore, hasMore }: BlogGridProps) => {
    const postIds = posts.map(post => post.id).join(',');

    return (
        <div className="space-y-8" key={postIds}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <BlogCard
                        key={post.id}
                        post={post}
                        onClick={(id) => {
                            window.location.href = `/post/${id}`
                        }}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={onLoadMore}
                        disabled={loading}
                        className="px-6 py-3 text-base font-medium text-white bg-[#4361ee] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? 'Loading...' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    )
})
```

### Blog Post View

- Rich content display
- Social sharing integration
- Author profile section
- Related posts
- Interactive reactions

### UI Components

- Reusable card system
- Loading states
- Error boundaries
- Image fallbacks
- Responsive design

## 🔄 Data Flow

### Apollo Client Setup

- Configured for optimal caching
- Pagination support
- Duplicate prevention
- Error handling

Reference implementation:

```26:55:src/graphql/client.ts
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: ['spaceIds'],
          merge(existing = { edges: [] }, incoming, { args }) {
            if (!args?.after) {
              return incoming;
            }

            const existingEdges = existing?.edges ?? [];
            const incomingEdges = incoming?.edges ?? [];

            const existingIds = new Set(existingEdges.map(edge => edge.node.id));

            const uniqueIncomingEdges = incomingEdges.filter(
              edge => !existingIds.has(edge.node.id)
            );

            return {
              ...incoming,
              edges: [...existingEdges, ...uniqueIncomingEdges],
            };
          },
        },
      },
    },
  },
});
```

### Custom Hooks

- `usePosts`: Manages post list with pagination
- `usePost`: Handles single post data fetching

## 📊 Data Models

### Blog Post Type

```2:61:src/types/blog.types.ts
export interface Post {
  id: string;
  title: string;
  description: string;
  shortContent: string;
  createdAt: string;
  status: "PUBLISHED" | "DRAFT" | "HIDDEN";
  url: string;
  relativeUrl: string;
  reactionsCount: number;
  fields?: Array<{
    key: string;
    value: string;
    relationEntities?: {
      medias?: Array<{
        url?: string;
        urls?: {
          medium?: string;
          small?: string;
        };
      }>;
    };
  }>;
  thumbnail?: {
    url?: string;
    urls?: {
      medium?: string;
      small?: string;
    };
  };
  reactions: {
    reaction: string;
    count: number;
  }[];
  space: {
    id: string;
    name: string;
  };
  owner?: {
    member?: {
      displayName: string;
      profilePicture?: {
        urls?: {
          thumb?: string;
        };
      };
    };
  };
}

export interface BlogPost extends Post {
  author: {
    name: string;
    avatar: string;
  };
  imageUrl: string;
  categories: string[];
  readTime: string;
  fields?: Post['fields']; // Include fields from Post interface
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

## ⚡ Performance Optimizations

1. **Image Optimization**

   - Lazy loading
   - Responsive images
   - Fallback system

2. **Data Management**

   - Efficient cache policies
   - Optimized pagination
   - Duplicate prevention

3. **Code Organization**
   - Route-based code splitting
   - Component lazy loading
   - Tree-shakeable imports

## 🔒 Security Features

- Content sanitization
- Secure API token management
- XSS prevention
- Type-safe implementations

## 🧪 Testing

The project structure supports:

- Unit testing components
- Integration testing data flow
- E2E testing user journeys

## 🛣️ Roadmap

1. Comment system implementation
2. User authentication
3. Category/tag filtering
4. Search functionality
5. Analytics integration
6. Post scheduling
7. SEO optimization

## 📚 Best Practices

### TypeScript

- Strict type checking
- Interface definitions
- Type guards

### React

- Functional components
- Custom hooks
- Memoization
- Error boundaries

### Performance

- Image optimization
- Cache management
- Code splitting

## 🔗 Useful Links

- [Bettermode API Documentation](https://developers.bettermode.com/)
- [GraphQL Documentation](https://api.bettermode.com/graphql)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

For detailed implementation examples and API documentation, please refer to the individual component files and their corresponding documentation.

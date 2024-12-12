export enum PostListOrderByEnum {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  title = 'title',
  reactionsCount = 'reactionsCount'
}

export interface PostsQueryVariables {
  limit: number;
  after?: string | null;
  orderBy?: PostListOrderByEnum;
  reverse?: boolean;
}

export interface SinglePostQueryVariables {
  id: string;
}
export interface Post {
  id: number;
  title: string;
  slug: string;
  author: number;
  thumbnail: string;
  content: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface BlogPost extends Post {
  author: {
    name: string;
    avatar: string;
  };
  imageUrl: string;
  categories: string[];
  readTime: string;
  slug: string;
  fields?: Post['fields'];
}

export interface BlogCardProps {
  post: BlogPost;
  onClick: (id: string) => void;
}

export interface BlogGridProps {
  posts: BlogPost[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export interface BlogPostsResponse {
  posts: {
    edges: Array<{
      cursor: string;
      node: Post;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

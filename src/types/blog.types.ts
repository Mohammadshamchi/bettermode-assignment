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
  id: string;
  title: string;
  description: string;
  shortContent: string;
  createdAt: string;
  status: "PUBLISHED" | "DRAFT" | "HIDDEN";
  url: string;
  relativeUrl: string;
  reactionsCount: number;
  commentsCount?: number;
  fields?: {
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
  }[];
  tags?: Array<{
    id: string;
    title: string;
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

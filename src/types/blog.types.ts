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
}

export interface PostsResponse {
  posts: {
    edges: {
      cursor: string;
      node: Post;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface BlogCardProps {
  post: BlogPost;
  onClick?: (id: string) => void;
}

export interface BlogGridProps {
  posts: BlogPost[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

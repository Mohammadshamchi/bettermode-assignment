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
  reactions: {
    reaction: string;
    count: number;
  }[];
  space: {
    id: string;
    name: string;
  };
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

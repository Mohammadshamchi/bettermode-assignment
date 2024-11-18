export interface Comment {
  id: string;
  shortContent: string;
  createdAt: string;
  owner: {
    member: {
      displayName: string | null;
      name: string;
      profilePicture?: {
        urls?: {
          thumb?: string;
        };
      };
    };
  };
  reactionsCount: number;
  repliesCount: number;
  totalRepliesCount: number;
  fields: {
    key: string;
    value: string;
  }[];
  replies?: {
    nodes: Comment[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    totalCount: number;
  };
}

export interface CommentResponse {
  replies: {
    nodes: Comment[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    totalCount: number;
  };
}

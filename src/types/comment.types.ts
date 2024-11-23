export interface Comment {
  id: string;
  shortContent: string;
  createdAt: string;
  reactionsCount: number;
  repliesCount: number;
  totalRepliesCount: number;
  fields: {
    key: string;
    value: string;
  }[];
  owner: {
    member: {
      displayName: string;
      name: string;
      profilePicture?: {
        urls?: {
          thumb?: string;
        };
      };
    };
  };
  replies?: {
    nodes: Comment[];
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

export interface CommentFormProps {
  postId: string;
  parentId?: string;
  onSubmit: (content: string, parentId?: string) => Promise<any>;
  onCancel: () => void;
}

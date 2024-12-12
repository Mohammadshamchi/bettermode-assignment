export interface Comment {
  id: number;
  content: string,
  author: number,
  post: number;
  parent: number | null;
  created_at: string,
  children?: Comment[];
}

export interface createCommentDTO{
  content: string,
  parent?: string,
  post:string| number,
}
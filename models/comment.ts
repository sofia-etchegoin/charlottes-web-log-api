export interface Comment {
  id: number
  comment: string
  postId: number
  dateCreated: string
}

export interface CommentData {
  comment: string
  postId: number
}

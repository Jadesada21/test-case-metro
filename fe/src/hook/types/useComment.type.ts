import type { Comment } from "../../lib/types/comment.type";


export interface CommentListResponse {
    comments: Comment[]
}

export interface CommentCreateResponse {
    comment: Comment
}
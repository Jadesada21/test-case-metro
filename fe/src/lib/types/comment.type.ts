import type { AuthorInfo } from "./author.type"


export interface Comment {
    id: number
    content: string
    blogId: number
    userId: number
    user: AuthorInfo
    createdAt: string
}

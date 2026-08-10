import type { AuthorInfo } from "./author.type"


export interface Blog {
    id: number
    title: string
    content: string
    authorId: number
    author: AuthorInfo
    createdAt: string
    updatedAt: string
}
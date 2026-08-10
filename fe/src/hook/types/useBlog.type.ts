import type { Blog } from "../../lib/types/blog.type";


export interface BlogLishResponse {
    blogs: Blog[]
}

export interface BlogDetailResponse {
    blog: Blog
}

export interface BlogInput {
    title: string
    content: string
}
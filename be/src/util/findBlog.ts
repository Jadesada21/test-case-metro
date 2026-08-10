import { PrismaClient } from "@prisma/client"
import { AppError } from "./appError"



export const authorSelect = {
    id: true,
    username: true
}

export async function findBlog(
    prisma: PrismaClient,
    id: number,
    includeAuthor = false
) {
    const blog = await prisma.blog.findUnique(
        {
            where: { id },
            include: includeAuthor ? { author: { select: authorSelect } } : undefined
        })

    if (!blog) {
        throw new AppError('Blog not found', 404)
    }
    return blog
}
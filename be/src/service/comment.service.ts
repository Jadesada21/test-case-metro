import { PrismaClient } from "@prisma/client";
import { findBlog } from "../util/findBlog";
import { CreateCommentInput } from "../types/comment.type";
import { AppError } from "../util/appError";


const userSelect = {
    id: true,
    username: true
}

export async function listCommentsByBlogIdService(prisma: PrismaClient, blogId: number) {
    await findBlog(prisma, blogId)

    return prisma.comment.findMany({
        where: { blogId },
        include: { user: { select: userSelect } },
        orderBy: { createdAt: 'desc' }
    })
}

export async function createCommentService(
    prisma: PrismaClient,
    blogId: number,
    userId: number,
    input: CreateCommentInput
) {
    const { content } = input

    if (!content || !content.trim()) {
        throw new AppError('Plase insert content', 400)
    }

    await findBlog(prisma, blogId)

    return prisma.comment.create({
        data: { content, blogId, userId },
        include: { user: { select: userSelect } },
    })
}

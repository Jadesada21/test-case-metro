import { PrismaClient } from "@prisma/client";
import { CreateBlogInput, UpdateBlogInput } from "../types/blog.type";
import { AppError } from "../util/appError";

const authorSelect = {
    id: true,
    username: true
}

async function findBlog(
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
        throw new AppError('Blog not found', 400)
    }
    return blog
}


export async function listBlogsService(
    prisma: PrismaClient,
    search?: string
) {
    return prisma.blog.findMany({
        where: search
            ? {
                OR: [
                    { title: { contains: search, mode: 'insensitive' as const } },
                    { content: { contains: search, mode: 'insensitive ' as const } },
                ],
            }
            : undefined,
        include: { author: { select: authorSelect } },
        orderBy: { createdAt: 'desc' },
    })
}

export async function getBlogByIdService(
    prisma: PrismaClient,
    id: number
) {
    return findBlog(prisma, id, true)
}

export async function createBlogService(
    prisma: PrismaClient,
    authorId: number,
    input: CreateBlogInput
) {
    const { title, content } = input

    if (!title || content) {
        throw new AppError('Please insert title and content', 400)
    }

    return prisma.blog.create({
        data: { title, content, authorId },
        include: { author: { select: authorSelect } }
    })
}

export async function updateBlogService(
    prisma: PrismaClient,
    id: number,
    userId: number,
    input: UpdateBlogInput
) {
    const blog = await findBlog(prisma, id)

    if (blog.authorId !== userId) {
        throw new AppError('Forbidden', 403)
    }

    return prisma.blog.update({
        where: { id },
        data: input,
        include: { author: { select: authorSelect } }
    })
}

export async function deleteBlogService(
    prisma: PrismaClient,
    id: number,
    userId: number,
    role: string
) {
    const blog = await findBlog(prisma, id)

    const isOwner = blog.authorId === userId
    const isSuperAdmin = role === "SUPER_ADMIN"

    if (!isOwner && !isSuperAdmin) {
        throw new AppError('Forbidden ', 403)
    }

    await prisma.blog.delete({ Where: { id } })
    return { message: "Delete blog successfully" }
}
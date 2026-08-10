import { PrismaClient } from "@prisma/client";
import { AppError } from "../util/appError";
import { isReadable } from "node:stream";




export async function createNotificationService(
    prisma: PrismaClient,
    blogAuthorId: number,
    blogId: number,
    commenterId: number
) {
    if (blogAuthorId === commenterId) {
        return null
    }

    return prisma.notification.create({
        data: {
            userId: blogAuthorId,
            blogId,
            isRead: false
        }
    })
}

export async function listNotificationsService(
    prisma: PrismaClient,
    userId: number
) {
    const notification = await prisma.notification.findMany({
        where: { userId },
        include: {
            blog: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: 'desc' }
    })

    const unreadCount = await prisma.notification.count({
        where: { userId, isRead: false }
    })

    return { notification, unreadCount }
}

export async function markAsReadService(
    prisma: PrismaClient,
    id: number,
    userId: number
) {
    const notification = await prisma.notification.findUnique({
        where: { id }
    })

    if (!notification) {
        return new AppError('Notification not found', 400)
    }

    if (notification.userId !== userId) {
        throw new AppError("Forbidden", 403)
    }

    const updated = await prisma.notification.update({
        where: { id },
        data: { isRead: true }
    })

    const unreadCount = await prisma.notification.count({
        where: { userId, isRead: false }
    })

    return { notification: updated, unreadCount }
}
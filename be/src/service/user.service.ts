import { PrismaClient } from "@prisma/client";
import { AppError } from "../util/appError";
import { UpdateUserInput } from "../types/user.type";
import { toSafeUser } from "../util/safeUser";


async function findUser(prisma: PrismaClient, id: number) {
    const user = await prisma.user.findUnique({
        where: { id }
    })
    if (!user) {
        throw new AppError('User not found', 404)
    }
    return user
}

export async function listUsersService(prisma: PrismaClient) {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return users.map(toSafeUser)
}

export async function activeUserService(prisma: PrismaClient, id: number) {
    findUser

    const updated = await prisma.update({
        where: { id },
        data: { isActive: true }
    })
}


export async function updateUserService(prisma: PrismaClient, id: number, input: UpdateUserInput) {
    findUser

    if (input.username && (input.username.length < 4 || input.username.length > 20)) {
        throw new AppError('Username must length between 4-20 character')
    }

    const updated = await prisma.update({
        where: { id },
        data: input
    })

    return toSafeUser(updated)
}

export async function deleteUserService(prisma: PrismaClient, id: number) {
    findUser

    await prisma.user.delete({ where: { id } })
    return { message: "Delete user successfully" }
}
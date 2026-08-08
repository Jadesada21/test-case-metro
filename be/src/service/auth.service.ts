import { PrismaClient } from "@prisma/client/extension"
import { LoginInput, RegisterInput } from "../types/auth.types"
import { isEmail } from "validator"
import bcrypt from 'bcrypt'
import { FastifyInstance } from "fastify"
import { AppError } from "../util/appError"
import { prisma } from "../prisma/prisma"


export function validateRegisterInput(input: RegisterInput) {
    const { username, email, password } = input

    if (!username || username.length < 4 || username.length > 20) {
        throw new AppError('Username must be length between 4-20 character', 400)
    }

    if (!email || !isEmail(email))
        throw new AppError('Invalid email address', 400)

    if (!password || password.length < 8) {
        throw new AppError('Password minimun 8 character', 400)
    }
}

export async function registerUserService(input: RegisterInput) {
    validateRegisterInput(input)

    const { username, email, password } = input

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        throw new AppError('Email already used', 409)
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })
    const { password: _pw, ...safeUser } = user

    return safeUser
}

export async function loginUserService(
    fastify: FastifyInstance,
    input: LoginInput
) {
    const { prisma } = fastify
    const { email, password } = input

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new AppError('Email or password invalid', 401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new AppError('Password Invalid', 401)
    }

    if (!user.isActive) {
        throw new AppError('Account access denied waiting approve from Super Admin', 403)
    }

    const token = fastify.jwt.sign({ id: user.id, role: user.role })

    const { password: _pw, ...safeUser } = user
    return { token, user: safeUser }
}
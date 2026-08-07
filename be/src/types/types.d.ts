import { PrismaClient, Role } from "@prisma/client";
import { FastifyRequest, FastifyReply } from 'fastify';



declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
        requireSuperAdmin: (request: FastifyRequest, reply: FastifyReply) => promise<void>
    }
}

export interface JwtPayload {
    id: number
    role: Role
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: JwtPayload
        user: JwtPayload
    }
}
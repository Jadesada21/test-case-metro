import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from '@fastify/jwt'
import fp from 'fastify-plugin'

async function authPlugin(fastify: FastifyInstance) {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET || 'change-this-secret',
    })

    fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.code(401).send({ message: 'Unauthorized: token Invalid or Expire' })
        }
    })

    fastify.decorate('requireSuperAdmin', async function (request: FastifyRequest, reply: FastifyReply) {
        if (request.user?.role !== "SUPER_ADMIN") {
            reply.code(403).send({ message: "Forbidden : This's for Super Admin Role only" })
        }
    })
}

export default fp(authPlugin)
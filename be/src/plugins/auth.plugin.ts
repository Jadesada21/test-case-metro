import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from '@fastify/jwt'
import fp from 'fastify-plugin'

async function authPlugin(fastify: FastifyInstance) {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET || 'change-this-secret',
    })

    fastify.decorate('authenticate', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            await req.jwtVerify()
        } catch (err) {
            res.code(401).send({ message: 'Unauthorized: token Invalid or Expire' })
        }
    })

    fastify.decorate('requireSuperAdmin', async function (req: FastifyRequest, res: FastifyReply) {
        if (req.user?.role !== "SUPER_ADMIN") {
            res.code(403).send({ message: "Forbidden : This's for Super Admin Role only" })
        }
    })
}

export default fp(authPlugin)
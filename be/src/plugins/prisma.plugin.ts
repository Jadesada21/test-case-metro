import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import fs from 'fastify-plugin'


async function prismaPlugin(fastify: FastifyInstance) {
    const prisma = new PrismaClient()

    await prisma.$connect()

    fastify.decorate('prisma', prisma)

    fastify.addHook('onClose', async (fastifyInstance) => {
        await fastifyInstance.prisma.$disconnect()
    })
}

export default prismaPlugin
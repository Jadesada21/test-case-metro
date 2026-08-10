import fastify, { FastifyServerOptions } from 'fastify'
import sensible from '@fastify/sensible'
import cors from '@fastify/cors'

import prismaPlugin from './plugins/prisma.plugin'
import authPlugin from './plugins/auth.plugin'
import { ErrorHandler } from './util/setErrorHandler'


function buildApp(opts: FastifyServerOptions = {}) {
    const app = fastify({ logger: true, ...opts })

    ErrorHandler(app)

    app.register(cors, {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    })
    app.register(sensible)
    app.register(prismaPlugin)
    app.register(authPlugin)

    app.get('health', async () => ({ status: 'OK' }))

    return app
}

export default buildApp

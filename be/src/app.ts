import fastify, { FastifyServerOptions } from 'fastify'
import sensible from '@fastify/sensible'
import cors from '@fastify/cors'

import prismaPlugin from './plugins/prisma.plugin'
import authPlugin from './plugins/auth.plugin'
import { ErrorHandler } from './util/setErrorHandler'
import authRoute from './routes/auth.route'
import userRoutes from './routes/user.route'
import blogRoute from './routes/blog.route'
import commentRoutes from './routes/comment.route'
import notificationRoutes from './routes/notification.route'


function buildApp(opts: FastifyServerOptions = {}) {
    const app = fastify({ logger: true, ...opts })

    ErrorHandler(app)

    app.register(cors, {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    })
    app.register(sensible)
    app.register(prismaPlugin)
    app.register(authPlugin)

    app.register(authRoute, { prefix: '/auth' })
    app.register(userRoutes, { prefix: '/users' })
    app.register(blogRoute, { prefix: '/blogs' })
    app.register(commentRoutes, { prefix: '/blogs' })
    app.register(notificationRoutes, { prefix: '/notifications' })

    app.get('/health', async () => ({ status: 'OK' }))

    return app
}

export default buildApp

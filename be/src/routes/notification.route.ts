import { FastifyInstance } from "fastify";
import { listNotificationsController, markAsReadController } from "../controller/notification.controller";
import { IdParam } from "../types/idParam.type";


async function notificationRoutes(fastify: FastifyInstance) {
    const { authenticate } = fastify

    fastify.get('/', { preHandler: [authenticate] }, listNotificationsController)

    fastify.patch<{ Params: IdParam }>('/:id/read', {
        preHandler: [authenticate]
    }, markAsReadController)
}

export default notificationRoutes
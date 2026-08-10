import { FastifyReply, FastifyRequest } from "fastify";
import { listNotificationsService, markAsReadService } from "../service/notification.service";
import { IdParam } from "../types/idParam.type";


export async function listNotificationsController(
    req: FastifyRequest, res: FastifyReply
) {
    const result = await listNotificationsService(req.server.prisma, req.user.id)
    return res.code(200).send(result)
}

export async function markAsReadController(
    req: FastifyRequest<{ Params: IdParam }>, res: FastifyReply
) {
    const result = await markAsReadService(req.server.prisma, Number(req.params.id), req.user.id)
    return res.code(200).send(result)
}
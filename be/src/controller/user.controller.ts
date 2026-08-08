import { FastifyReply, FastifyRequest } from "fastify";
import { activeUserService, deleteUserService, listUsersService, updateUserService } from "../service/user.service";
import { UpdateUserInput } from "../types/user.type";


interface IdParam {
    id: string
}

export async function listUsersController(req: FastifyRequest,
    res: FastifyReply) {
    const users = await listUsersService(req.server.prisma)
    return res.code(200).send({ users })
}

export async function activeUserContoller(req: FastifyRequest<{ Params: IdParam }>,
    res: FastifyReply) {
    const user = await activeUserService(req.server.prisma, Number(req.params.id))

    return res.code(200).send({ message: 'Active user successfully', user })
}

export async function updateUserController(req: FastifyRequest<{ Params: IdParam, Body: UpdateUserInput }>, res: FastifyReply) {
    const user = await updateUserService(req.server.prisma, Number(req.params.id), req.body)

    return res.code(200).send({ message: 'Update data user successfully', user })
}

export async function deleteUserController(req: FastifyRequest<{ Params: IdParam }>, res: FastifyReply) {
    const result = await deleteUserService(req.server.prisma, Number(req.params.id))
    return res.code(200).send(result)
}
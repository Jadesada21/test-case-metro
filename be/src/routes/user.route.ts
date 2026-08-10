import { FastifyInstance } from "fastify";
import { activeUserContoller, deleteUserController, listUsersController, updateUserController } from "../controller/user.controller";
import { IdParam } from "../types/idParam.type";
import { UpdateUserInput } from "../types/user.type";



async function userRoutes(fastify: FastifyInstance) {
    const { authenticate, requireSuperAdmin } = fastify

    fastify.get('/', {
        preHandler: [authenticate,
            requireSuperAdmin
        ]
    }, listUsersController)

    fastify.patch<{ Params: IdParam }>(
        '/:id/active',
        { preHandler: [authenticate, requireSuperAdmin] },
        activeUserContoller
    )

    fastify.put<{ Params: IdParam, Body: UpdateUserInput }>(
        '/:id',
        { preHandler: [authenticate] },
        updateUserController
    )

    fastify.delete<{ Params: IdParam }>(
        '/:id',
        { preHandler: [authenticate, requireSuperAdmin] },
        deleteUserController
    )
}

export default userRoutes
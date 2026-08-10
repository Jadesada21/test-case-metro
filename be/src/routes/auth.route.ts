import { FastifyInstance } from "fastify";
import { LoginInput, RegisterInput } from "../types/auth.types";
import { getMeController, loginUserController, logoutUserController, registerUserController } from "../controller/auth.controller";



async function authRoute(fastify: FastifyInstance) {
    const { authenticate } = fastify

    fastify.post<{ Body: RegisterInput }>(
        '/register', registerUserController
    )

    fastify.post<{ Body: LoginInput }>(
        '/login', loginUserController
    )

    fastify.get('/me', {
        preHandler: [authenticate]
    }, getMeController)

    fastify.post('/logout', {
        preHandler: [authenticate]
    }, logoutUserController)
}
export default authRoute
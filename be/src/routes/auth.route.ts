import { FastifyInstance } from "fastify";
import { LoginInput, RegisterInput } from "../types/auth.types";
import { loginUserController, logoutUserController, registerUserController } from "../controller/auth.controller";



async function authRoute(fastify: FastifyInstance) {
    const { authenticate } = fastify

    fastify.post<{ Body: RegisterInput }>(
        '/register', registerUserController
    )

    fastify.post<{ Body: LoginInput }>(
        '/login', loginUserController
    )

    fastify.post('/logout', {
        preHandler: [authenticate]
    }, logoutUserController)
}
export default authRoute
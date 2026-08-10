import { FastifyInstance } from "fastify";
import { LoginInput, RegisterInput } from "../types/auth.types";
import { LoginUserController, registerUserController } from "../controller/auth.controller";



async function authRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: RegisterInput }>(
        '/register', registerUserController
    )

    fastify.post<{ Body: LoginInput }>(
        '/login', LoginUserController
    )
}
export default authRoute
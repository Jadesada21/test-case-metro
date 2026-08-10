import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../util/appError";
import { loginUserService, logoutUserService, registerUserService } from "../service/auth.service";
import { LoginInput, RegisterInput } from "../types/auth.types";


interface RegisterRoute {
    Body: RegisterInput
}

export async function registerUserController(req: FastifyRequest<RegisterRoute>, res: FastifyReply) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new AppError("Missing Requires Fields", 400)
    }

    const newUser = await registerUserService(req.body)

    return res.status(201).send({ newUser })
}

export async function loginUserController(req: FastifyRequest<{ Body: LoginInput }>, res: FastifyReply) {
    try {
        const result = await loginUserService(req.server, req.body)

        return res.code(200).send(result)
    } catch (err) {
        if (err instanceof AppError) {
            return res.code(err.statusCode).send({ message: err.message })
        }
        req.log.error(err)
        return res.code(500).send({ message: "Something wrong try again" })
    }
}

export async function logoutUserController(req: FastifyRequest, res: FastifyReply) {
    try {
        const result = await logoutUserService()
        return res.code(200).send(result)
    } catch (err) {
        if (err instanceof AppError) {
            return res.code(err.statusCode).send({ message: err.message })
        }
        req.log.error(err)
        return res.code(500).send({ message: "Something wrong try again" })
    }
}
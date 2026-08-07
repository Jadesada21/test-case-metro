import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../util/AppError";
import { registerUserService } from "../service/auth.service";
import { RegisterInput } from "../types/auth.types";
import { PrismaClient } from "@prisma/client";

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
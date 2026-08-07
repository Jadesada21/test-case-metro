import { FastifyInstance } from "fastify";
import { AppError } from "./AppError";


export function ErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error, req, reply) => {
        if (error instanceof AppError) {
            return reply.status(error.statusCode).send({
                message: error.message
            })
        }
        console.error(error)

        return reply.status(500).send({
            message: "Internal server error"
        })
    })
}
import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdParam } from "../types/idParam.type";
import { createCommentService, listCommentsByBlogIdService } from "../service/comment.service";
import { CreateCommentInput } from "../types/comment.type";



export async function listCommentsByBlogIdController(
    req: FastifyRequest<{ Params: IdParam }>,
    res: FastifyReply
) {
    const comments = await listCommentsByBlogIdService(req.server.prisma,
        Number(req.params.id))
    return res.code(200).send({ comments })
}

export async function
    createCommentController(
        req: FastifyRequest<{ Params: IdParam, Body: CreateCommentInput }>, res: FastifyReply
    ) {
    const comment = await createCommentService(
        req.server.prisma,
        Number(req.params.id),
        req.user.id,
        req.body
    )
    return res.code(201).send({ message: "Create comment successfully", comment })
}
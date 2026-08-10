import { FastifyInstance } from "fastify";
import { IdParam } from "../types/idParam.type";
import { listBlogsController } from "../controller/blog.controller";
import { createCommentController, listCommentsByBlogIdController } from "../controller/comment.controller";
import { CreateCommentInput } from "../types/comment.type";



async function commentRoutes(fastify: FastifyInstance) {
    const { authenticate } = fastify

    fastify.get<{ Params: IdParam }>('/:id/comments', {
        preHandler: [authenticate]
    }, listCommentsByBlogIdController)

    fastify.post<{ Params: IdParam, Body: CreateCommentInput }>('/:id/comments', {
        preHandler: [authenticate]
    }, createCommentController)
}

export default commentRoutes
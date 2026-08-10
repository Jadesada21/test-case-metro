import { FastifyInstance } from "fastify";
import { IdParam } from "../types/idParam.type";
import { createBlogController, deleteBlogController, getBlogByIdController, listBlogsController, updateBlogController } from "../controller/blog.controller";
import { CreateBlogInput, SearchQuery, UpdateBlogInput } from "../types/blog.type";



async function blogRoute(fastify: FastifyInstance) {
    const { authenticate } = fastify

    fastify.get<{ Querystring: SearchQuery }>('/', {
        preHandler: [authenticate]
    }, listBlogsController)

    fastify.get<{ Params: IdParam }>('/:id', {
        preHandler: [authenticate]
    }, getBlogByIdController)

    fastify.post<{ Body: CreateBlogInput }>('/', {
        preHandler: [authenticate]
    }, createBlogController)

    fastify.put<{ Params: IdParam, Body: UpdateBlogInput }>('/:id', {
        preHandler: [authenticate]
    }, updateBlogController)

    fastify.delete<{ Params: IdParam }>('/:id', {
        preHandler: [authenticate]
    }, deleteBlogController)
}
export default blogRoute

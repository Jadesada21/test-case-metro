import { FastifyReply, FastifyRequest } from "fastify";
import { CreateBlogInput, SearchQuery, UpdateBlogInput } from "../types/blog.type";
import { createBlogService, deleteBlogService, getBlogByIdService, listBlogsService, updateBlogService } from "../service/blog.service";
import { IdParam } from "../types/idParam.type";



export async function listBlogsController(
    req: FastifyRequest<{ Querystring: SearchQuery }>, res: FastifyReply) {
    const blogs = await listBlogsService(req.server.prisma, req.query.search)
    return res.code(200).send({ blogs })
}


export async function getBlogByIdController(
    req: FastifyRequest<{ Params: IdParam }>, res: FastifyReply
) {
    const blog = await getBlogByIdService(req.server.prisma, Number(req.params.id))
    return res.code(200).send({ blog })
}

export async function createBlogController(
    req: FastifyRequest<{ Body: CreateBlogInput }>,
    res: FastifyReply
) {
    const blog = await createBlogService(req.server.prisma, req.user.id, req.body)
    return res.code(201).send({ message: 'Create blog successfully', blog })
}

export async function updateBlogController(req: FastifyRequest<{ Params: IdParam, Body: UpdateBlogInput }>, res: FastifyReply) {
    const blog = await updateBlogService(
        req.server.prisma,
        Number(req.params.id),
        req.user.id,
        req.body
    )
    return res.code(200).send({ message: 'Update blog successfully', blog })
}

export async function deleteBlogController(req: FastifyRequest<{ Params: IdParam }>, res: FastifyReply) {
    const result = await deleteBlogService(
        req.server.prisma,
        Number(req.params.id),
        req.user.id,
        req.user.role
    )
    return res.code(200).send(result)
}
import { FastifyInstance } from 'fastify';
import PostRepository from '../repositories/post.repository';
import { decodeToken, verifyToken } from '../services/JWTService';
import { IPost } from '../interfaces/post.interface';
import { postSchemaValidation } from '../services/validation/postSchema';

export async function PostController(fastify: FastifyInstance) {

    const postRepository = new PostRepository();

    fastify.addHook('preHandler', verifyToken);

    fastify.get('/', async (request, reply) => {
        const { status, message } = await postRepository.get();
        return reply.status(status).send(message);
    });

    fastify.get<{Params: { id: number }}>
    ('/:id', async (request, reply) => {
        const { id } = request.params;
        const { status, message } = await postRepository.getById(+id);
        return reply.status(status).send(message);
    });

    fastify.post<{Body: IPost}>
    ('/', postSchemaValidation, async (request, reply) => {
        const userId = decodeToken(request.headers.authorization!);
        const { status, message } = await postRepository.create(request.body, userId);
        return reply.status(status).send(message);
    });

    fastify.put<{Body: IPost, Params: { id: number }}>
    ('/:id', postSchemaValidation, async (request, reply) => {
        const { id } = request.params;
        const { status, message } = await postRepository.update(request.body, +id);
        return reply.status(status).send(message);
    });

    fastify.delete<{Params: { id: number}}>
    ('/:id', async (request, reply) => {
        const { id } = request.params;
        const { status, message } = await postRepository.delete(+id);
        return reply.status(status).send(message);
    });

}
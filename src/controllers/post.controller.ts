import { FastifyInstance } from 'fastify';
import PostRepository from '../repositories/post.repository';
import { decodeToken, verifyToken } from '../services/JWTService';
import { IPost } from '../interfaces/post.interface';

export async function PostController(fastify: FastifyInstance) {

    const postRepository = new PostRepository();

    fastify.addHook('preHandler', verifyToken);

    fastify.get('/', async (request, reply) => {
        const { status, message } = await postRepository.get();
        return reply.status(status).send(message);
    });

    fastify.post<{Body: IPost}>('/', async (request, reply) => {
        const userId = decodeToken(request.headers.authorization!);
        const { status, message } = await postRepository.create(request.body, userId);
        return reply.status(status).send(message);
    });

}
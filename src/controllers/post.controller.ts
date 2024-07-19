import { FastifyInstance } from 'fastify';
import PostRepository from '../repositories/post.repository';
import { verifyToken } from '../services/JWTService';

export async function PostController(fastify: FastifyInstance) {

    const postRepository = new PostRepository();

    fastify.addHook('preHandler', verifyToken);

    fastify.get('/', async (request, reply) => {
        const { status, message } = await postRepository.get();
        return reply.status(status).send(message);
    });

}
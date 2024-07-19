import { FastifyInstance } from 'fastify';
import PostRepository from '../repositories/post.repository';

export async function PostController(fastify: FastifyInstance) {

    const postRepository = new PostRepository();

    fastify.get('/', async (request, reply) => {
        const { status, message } = await postRepository.get();
        return reply.status(status).send(message);
    });

}
import { FastifyInstance } from 'fastify';
import UserRepository from '../repositories/user.repository';
import { IUser } from '../interfaces/user.interface';

export async function UserController(fastify: FastifyInstance) {

    const userRepository = new UserRepository();

    fastify.get('/', async (request, reply) => {
        const { status, message } = await userRepository.get();
        return reply.status(status).send(message);
    });

    fastify.get<{Params: { id: number }}>('/:id', async (request, reply) => {
        const { status, message } = await userRepository.getById(+request.params.id);
        return reply.status(status).send(message);
    });

    fastify.post<{Body: IUser}>('/', async (request, reply) => {
        const { status, message } = await userRepository.create(request.body);
        return reply.status(status).send(message);
    });

    fastify.put<{Body: IUser, Params: { id: number }}>('/:id', async (request, reply) => {
        const { status, message } = await userRepository.update(request.body, +request.params.id);
        return reply.status(status).send(message);
    });

    fastify.delete<{Params: { id: number }}>('/:id', async (request, reply) => {
        const { status, message } = await userRepository.delete(+request.params.id);
        return reply.status(status).send(message);
    });

}
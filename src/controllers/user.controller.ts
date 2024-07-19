import { FastifyInstance } from 'fastify';
import UserRepository from '../repositories/user.repository';
import { IUser } from '../interfaces/user.interface';
import { userSchemaValidation } from '../services/validation/userSchema';
import { verifyPassword } from '../services/PasswordCrypto';
import { sign } from '../services/JWTService';

export async function UserController(fastify: FastifyInstance) {

    const userRepository = new UserRepository();

    fastify.get('/', async (request, reply) => {
        const { status, message } = await userRepository.get();
        return reply.status(status).send(message);
    });

    fastify.get<{Params: { id: number }}>
    ('/:id', async (request, reply) => {
        const { id } = request.params;
        const { status, message } = await userRepository.getById(+id);
        return reply.status(status).send(message);
    });

    fastify.post<{Body: IUser}>
    ('/', userSchemaValidation, async (request, reply) => {
        const { status, message } = await userRepository.create(request.body);
        return reply.status(status).send(message);
    });

    fastify.post<{Body: IUser}>
    ('/login', async (request, reply) => {
        const { email, password } = request.body;
        const { status, message } = await userRepository.getByEmail(email);

        if(status == 401) return reply.status(status).send(message);

        const passwordCheck = await verifyPassword(password, message.password);
        if(!passwordCheck) return reply.status(401).send({ message: 'Unauthorized!'});

        const accessToken = sign({id: message.id, email: message.email});
        return reply.status(status).send({token: accessToken});
    });

    fastify.put<{Body: IUser, Params: { id: number }}>
    ('/:id', userSchemaValidation, async (request, reply) => {
        const { id } = request.params;
        const { status, message } = await userRepository.update(request.body, +id);
        return reply.status(status).send(message);
    });

    fastify.delete<{Params: { id: number }}>
    ('/:id', async (request, reply) => {
        const { id } = request.params;
        const { status, message } = await userRepository.delete(+id);
        return reply.status(status).send(message);
    });

}
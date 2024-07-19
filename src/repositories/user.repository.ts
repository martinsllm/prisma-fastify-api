import { prisma } from '../database/prisma';
import { IUser } from '../interfaces/user.interface';
import { resp, respM } from '../utils/resp';
import { hashPassword } from '../services/PasswordCrypto';

class UserRepository {

    async get() {
        const result = await prisma.user.findMany();
        return resp(200, result);
    }

    async getById(id: number) {
        const result = await prisma.user.findFirst({
            where: { id }
        });

        if(!result) return respM(404, 'User Not Found!');

        return resp(200, result);
    }

    async getByEmail(email: string) {
        const result = await prisma.user.findFirst({
            where: { email }
        });

        if(!result) return respM(401, 'Unauthorized!');

        return resp(200, result);
    }

    async create(user: IUser) {
        const hashedPassword = await hashPassword(user.password);

        const result = await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword
            }
        });

        return resp(201, result);
    }

    async update(user: IUser, id: number) {
        const { status, message } = await this.getById(id);

        if(status == 404) return resp(status, message);

        await prisma.user.update({
            data: {
                ...user
            },
            where: { 
                id 
            }
        });

        return resp(204, []);
    }

    async delete(id: number) {
        const { status, message } = await this.getById(id);

        if(status == 404) return resp(status, message);

        await prisma.user.delete({
            where: {
                id
            }
        });

        return resp(204, []);
    }

}

export default UserRepository;
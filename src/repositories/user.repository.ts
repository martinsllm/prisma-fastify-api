import { prisma } from '../database/prisma';
import { IUser } from '../interfaces/user.interface';
import { resp, respM } from '../utils/resp';

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

    async create(user: IUser) {
        const result = await prisma.user.create({
            data: {
                ...user,
            }
        });

        return resp(201, result);
    }

}

export default UserRepository;
import { prisma } from '../database/prisma';
import { IPost } from '../interfaces/post.interface';
import { resp, respM } from '../utils/resp';

class PostRepository {

    async get() {
        const result = await prisma.post.findMany();
        return resp(200, result);
    }

    async getById(id: number) {
        const result = await prisma.post.findUnique({
            where: {
                id
            }
        });

        if(!result) return respM(404, 'Post Not Found!');

        return resp(200, result);
    }

    async create(post: IPost, userId: number) {
        const result = await prisma.post.create({
            data: {
                ...post,
                userId
            }
        });

        return resp(201, result);
    }

    async update(post: IPost, id: number) {
        const { status, message } = await this.getById(id);

        if(status == 404) return resp(status, message);

        await prisma.post.update({
            data: {
                ...post
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

        await prisma.post.delete({
            where: {
                id
            }
        });

        return resp(204, []);
    }


}

export default PostRepository;
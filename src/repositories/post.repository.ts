import { prisma } from '../database/prisma';
import { IPost } from '../interfaces/post.interface';
import { resp } from '../utils/resp';

class PostRepository {

    async get() {
        const result = await prisma.post.findMany();
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

}

export default PostRepository;
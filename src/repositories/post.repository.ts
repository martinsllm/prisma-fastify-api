import { prisma } from '../database/prisma';
import { resp } from '../utils/resp';

class PostRepository {

    async get() {
        const result = await prisma.post.findMany();
        return resp(200, result);
    }

}

export default PostRepository;
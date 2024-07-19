import { PostController } from '../controllers/post.controller';
import { UserController } from '../controllers/user.controller';
import server from '../server';

export const routes = async () => {

    server.register(UserController, {
        prefix: '/user'
    });

    server.register(PostController, {
        prefix: '/post'
    });

};



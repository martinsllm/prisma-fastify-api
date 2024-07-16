import { UserController } from '../controllers/user.controller';
import server from '../server';

export const routes = async () => {

    server.register(UserController, {
        prefix: '/user'
    });

};



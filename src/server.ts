import Fastify from 'fastify';
import { routes } from './routes/Router';

const server = Fastify({
    logger: true
});

server.register(routes);

export default server;





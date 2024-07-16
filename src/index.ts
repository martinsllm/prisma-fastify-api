import server from './server';
import 'dotenv/config';

const PORT = process.env.PORT || 8000;

server.listen({ port: +PORT }, (err, address) => {
    console.log(`Server listening on ${address}`);
});
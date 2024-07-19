import 'dotenv/config';
import jwt, { SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const sign = (payload: { id: number, email: string }, expiresIn = '6h') => {
    const jwtConfig: SignOptions = {
        algorithm: 'HS256',
        expiresIn
    };

    return jwt.sign(payload, secret, jwtConfig);
};

export { sign };
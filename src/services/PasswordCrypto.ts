import { genSalt, hash, compare } from 'bcryptjs';

const SALT_ROUNDS = 8;

const hashPassword = async (password: string) => {
    const saltGenerated = await genSalt(SALT_ROUNDS);
    return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hash: string) => {
    return await compare(password, hash);
};

export { hashPassword, verifyPassword };
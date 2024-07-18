import { genSalt, hash } from 'bcryptjs';

const SALT_ROUNDS = 8;

const hashPassword = async (password: string) => {
    const saltGenerated = await genSalt(SALT_ROUNDS);
    return await hash(password, saltGenerated);
};

export { hashPassword };
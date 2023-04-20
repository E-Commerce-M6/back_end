import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

const loginUserService = async ({ email, password }) => {
    const userRepository = AppDataSource.getRepository(User);

    const findUsers = await userRepository.findOneBy({ email: email });

    if (!findUsers) {
        throw new AppError('Password or email incorrect', 403);
    }

    const checkPassword = await compare(password, findUsers.password);

    if (!checkPassword) {
        throw new AppError('Password or email incorrect', 403);
    }

    const tokenUser = jwt.sign(
        { isSeller: findUsers.is_seller },
        process.env.SECRET_KEY!,
        {
            subject: findUsers.id,
            expiresIn: '24h',
        }
    )
    const idUser = findUsers.id
    const returnedResponse = {tokenUser, idUser}

    return returnedResponse
};

export { loginUserService };

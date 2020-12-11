import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import User from '../../models/User';

interface UserInterface {
    name: string;
    email: string;
    password: string;
}

export default {
    async execute(request: Request, response: Response): Promise<User> {
        try {
            const { name, email, password }: UserInterface = request.body;

            const usersRepository = getRepository(User);

            // Verifica se o usuário existe baseado no email.
            const checkUserExists = await usersRepository.findOne({
                where: { email },
            });

            if (checkUserExists) {
                throw new Error('Email address already used.');
            }

            // Caso não exista, faz a validação dos dados enviados
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string()
                    .email('E-mail must be a valid e-mail.')
                    .required(),
                password: Yup.string().required(),
            });

            await schema.validate(request.body, { abortEarly: false });

            // Encripta a senha
            const hashedPassword = await hash(password, 8);

            // Registra o novo usuário
            const user = usersRepository.create({
                name,
                email,
                password: hashedPassword,
            });

            await usersRepository.save(user);

            const finalUser = await usersRepository.findOne({
                where: { email },
            });

            return response.status(200).json(finalUser) && user;
        } catch (error) {
            response.status(400).json(error.message);
            throw new Error(error.message);
        }
    },
};

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import User from '../../models/User';

export default {
    async execute(request: Request, response: Response): Promise<User> {
        try {
            const { id } = request.params;
            const { name, email, password } = request.body;

            const userRepository = getRepository(User);

            // Verificar se o usuário existe
            const foundUser = await userRepository.findOne(id);

            if (!foundUser) {
                throw new Error('User not found.');
            }

            // Caso exista, vai realizar a validação dos novos dados
            const schema = Yup.object().shape({
                name: Yup.string(),
                email: Yup.string().email('E-mail inválido.'),
                password: Yup.string(),
            });

            await schema.validate(request.body, { abortEarly: false });

            // Encriptar a senha
            const hashedPassword = await hash(password, 8);

            const data = {
                name,
                email,
                password: hashedPassword,
            };

            // Realizar a atualização
            const update = await userRepository.update(id, data);

            if (update.affected !== 1) {
                throw new Error('Impossível realizar a atualização.');
            }

            const updatedUser = userRepository.findOneOrFail(id);

            return response.status(200).json(data) && updatedUser;
        } catch (error) {
            response.status(400).json(error.message);
            throw new Error(error);
        }
    },
};

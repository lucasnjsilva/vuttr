/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../../models/User';

interface SessionResponse {
    user: User;
    token: string;
}

export default {
    async execute(
        request: Request,
        response: Response,
    ): Promise<SessionResponse> {
        try {
            const { email, password } = request.body;

            const userRepository = getRepository(User);

            const user = await userRepository.findOne({ where: { email } });

            if (!user) {
                response.status(401);
                throw new Error('User or password incorrect.');
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                response.status(401);
                throw new Error('User or password incorrect.');
            }

            const { secret, expiresIn } = authConfig.jwt;

            const token = sign({}, secret, {
                subject: user.id,
                expiresIn,
            });

            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at,
                token,
            };

            return response.status(200).json(userData) && { user, token };
        } catch (error) {
            response.status(400).json({ message: error.message });
            throw new Error(error.message);
        }
    },
};

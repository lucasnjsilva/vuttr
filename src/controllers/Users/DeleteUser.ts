/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../models/User';

export default {
    async execute(request: Request, response: Response): Promise<any> {
        try {
            const { id } = request.params;

            await getRepository(User).delete(id);

            return response.status(200).json();
        } catch (error) {
            return response.status(400).json({ message: error.message });
        }
    },
};

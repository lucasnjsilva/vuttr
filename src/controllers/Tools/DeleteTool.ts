/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Tool from '../../models/Tool';

export default {
    async execute(request: Request, response: Response): Promise<any> {
        try {
            const { id } = request.params;

            await getRepository(Tool).delete(id);

            return response.json();
        } catch (error) {
            response.status(400).json({ msg: error.message });
            throw new Error(error.message);
        }
    },
};

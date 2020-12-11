import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Tool from '../../models/Tool';

export default {
    async execute(request: Request, response: Response): Promise<Tool[]> {
        try {
            const tools = await getRepository(Tool).find();

            return response.json(tools) && tools;
        } catch (error) {
            response.json({ msg: error.message });
            throw new Error(error.message);
        }
    },
};

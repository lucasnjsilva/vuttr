import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Tool from '../../models/Tool';

interface Update {
    id: string;
    name: string;
    description: string;
    link: string;
    user_id: string;
    tags: Array<{ tag: string }>;
}

export default {
    async execute(request: Request, response: Response): Promise<Tool> {
        try {
            const { id } = request.params;

            const {
                name,
                description,
                link,
                user_id,
                tags,
            }: Update = request.body;

            const toolsRepository = getRepository(Tool);

            const checkTool = await toolsRepository.findOne(id);

            const toolNotFound = !checkTool;

            if (toolNotFound) {
                throw new Error('This tool does not exist.');
            }

            const data = {
                name,
                description,
                link,
                user_id,
                tags,
            };

            const update = await toolsRepository.update(id, data);

            if (update.affected !== 1) {
                throw new Error('Impossível atualizar');
            }

            const tool = await toolsRepository.findOneOrFail(id);

            return response.status(200).json(400) && tool;
        } catch (error) {
            response.status(400).json({ msg: error.message });
            throw new Error(error.message);
        }
    },
};

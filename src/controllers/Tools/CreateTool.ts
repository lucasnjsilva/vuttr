import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Tool from '../../models/Tool';
import ToolInterface from '../../interfaces/ToolInterface';

export default {
    async execute(request: Request, response: Response): Promise<Tool> {
        try {
            const {
                name,
                description,
                link,
                user_id,
                tags,
            }: ToolInterface = request.body;

            const toolsRepository = getRepository(Tool);

            const checkTool = await toolsRepository.findOne({
                where: { name },
            });

            if (checkTool) {
                throw new Error('Tool already registered.');
            }

            const tool = toolsRepository.create({
                name,
                description,
                link,
                user_id,
                tags,
            });

            await toolsRepository.save(tool);

            return response.status(200).json(tool) && tool;
        } catch (error) {
            response.status(400).json({ msg: error.message });
            throw new Error(error.message);
        }
    },
};

import { getRepository } from 'typeorm';
import Tool from '../../models/Tool';
import ToolInterface from '../../interfaces/ToolInterface';

class CreateToolService {
    public async execute({
        name,
        description,
        link,
        user_id,
        tags,
    }: ToolInterface): Promise<Tool> {
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

        return tool;
    }
}

export default CreateToolService;

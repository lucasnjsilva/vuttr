import { getRepository } from 'typeorm';
import Tool from '../../models/Tool';
// import ToolInterface from '../../interfaces/ToolInterface';

interface Update {
    id: string;
    name: string;
    description: string;
    link: string;
    user_id: string;
    tags: Array<{ tag: string }>;
}

class UpdateToolService {
    public async execute({
        id,
        name,
        description,
        link,
        user_id,
        tags,
    }: Update): Promise<Tool> {
        const toolsRepository = getRepository(Tool);

        const checkTool = await toolsRepository.findOne(id);

        if (!checkTool) {
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

        const tool = await toolsRepository.findOne(id);

        return tool;
    }
}

export default UpdateToolService;

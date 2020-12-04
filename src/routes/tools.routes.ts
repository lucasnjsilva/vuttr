import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Tag from '../models/Tag';
import Tool from '../models/Tool';
import CreateToolService from '../services/serviceTools/CreateToolService';

const toolsRouter = Router();

// Pesquisar por tag
toolsRouter.get('/search/', async (request: Request, response: Response) => {
    try {
        const { tag } = request.query;
        const tagsRepository = getRepository(Tag);
        const toolsRepository = getRepository(Tool);

        if (!tag) {
            throw new Error('Tag not found');
        }

        const tags = await tagsRepository.find({
            where: {
                tag,
            },
        });

        const searchTool = tags.map(async tool => {
            const searching = await toolsRepository.find({
                select: ['name', 'description', 'link'],
                where: {
                    id: tool.tools_id,
                },
            });

            return searching;
        });

        const tools = await Promise.all(searchTool);

        return response.status(200).json({
            Search: `You searched for ${tag}.`,
            Tools: tools,
        });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// Listar todos
toolsRouter.get('/', async (request: Request, response: Response) => {
    try {
        const tools = await getRepository(Tool).find();

        return response.json(tools);
    } catch (error) {
        return response.json({ msg: error.message });
    }
});

// Mostrar detalhes de 1
toolsRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        const tools = await getRepository(Tool).findOne(id);
        const tags = await getRepository(Tag).find({
            where: { tools_id: id },
        });

        const data = {
            tools,
            tags,
        };

        return response.json(data);
    } catch (error) {
        return response.json({ msg: error.message });
    }
});

// Cadastrar 1
toolsRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { name, description, link, user_id, tags } = request.body;

        const createTool = new CreateToolService();

        const tool = await createTool.execute({
            name,
            description,
            link,
            user_id,
            tags,
        });

        return response.json(tool);
    } catch (err) {
        return response.status(400).json({ msg: err.message });
    }
});

// Atualizar 1
toolsRouter.put('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        const toolsRepository = getRepository(Tool);

        const checkTool = await toolsRepository.findOne(id);

        if (!checkTool) {
            throw new Error('This tool does not exist.');
        }

        const tool = await toolsRepository.update(id, request.body);

        return response.json(tool);
    } catch (error) {
        return response.status(400).json({ msg: error.message });
    }
});

// Deletar 1
toolsRouter.delete('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        await getRepository(Tool).delete(id);

        return response.json();
    } catch (error) {
        return response.json({ msg: error.message });
    }
});

export default toolsRouter;

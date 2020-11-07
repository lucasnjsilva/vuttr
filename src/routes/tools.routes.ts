import { Router, Request, Response } from 'express';
import CreateToolService from '../services/serviceTools/CreateToolService';

const toolsRouter = Router();

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
        // console.log(request.body.user_id);
        return response.status(400).json({ msg: err.message });
    }
});

export default toolsRouter;

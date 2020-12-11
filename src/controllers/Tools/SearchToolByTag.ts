/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Tool from '../../models/Tool';
import Tag from '../../models/Tag';

export default {
    async execute(request: Request, response: Response): Promise<any> {
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
    },
};

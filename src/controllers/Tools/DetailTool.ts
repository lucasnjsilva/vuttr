/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Tool from '../../models/Tool';
import Tag from '../../models/Tag';

export default {
    async execute(request: Request, response: Response): Promise<any> {
        try {
            const { id } = request.params;

            const tools = await getRepository(Tool).findOneOrFail(id);
            const tags = await getRepository(Tag).findOneOrFail({
                where: { tools_id: id },
            });

            const data = {
                tools,
                tags,
            };

            return response.status(200).json(data);
        } catch (error) {
            response.status(400).json({ msg: error.message });
            throw new Error(error.message);
        }
    },
};

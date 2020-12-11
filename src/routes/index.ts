import { Router } from 'express';

import toolsRouter from './tools.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/tools', toolsRouter);

export default router;

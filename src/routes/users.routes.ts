import { Router } from 'express';
import CreateUser from '../controllers/Users/CreateUser';

const usersRouter = Router();

usersRouter.post('/', CreateUser.execute);

export default usersRouter;

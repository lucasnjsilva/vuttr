import { Router } from 'express';

import CreateUser from '../controllers/Users/CreateUser';
import DetailUser from '../controllers/Users/DetailUser';
import UpdateUser from '../controllers/Users/UpdateUser';
import DeleteUser from '../controllers/Users/DeleteUser';
import SessionUser from '../controllers/Users/SessionUser';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/session/', SessionUser.execute); // Faz o login

usersRouter.post('/', CreateUser.execute); // Cadastra um novo usuário
usersRouter.get('/:id', ensureAuthenticated, DetailUser.execute); // Exibir um usuário
usersRouter.put('/:id', ensureAuthenticated, UpdateUser.execute); // Atualiza um usuário
usersRouter.delete('/:id', ensureAuthenticated, DeleteUser.execute); // Deleta um usuário

export default usersRouter;

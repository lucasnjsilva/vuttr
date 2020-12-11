import { Router } from 'express';

import CreateTool from '../controllers/Tools/CreateTool';
import UpdateTool from '../controllers/Tools/UpdateTool';
import DeleteTool from '../controllers/Tools/DeleteTool';
import ListTools from '../controllers/Tools/ListTools';
import DetailTool from '../controllers/Tools/DetailTool';
import SearchToolByTag from '../controllers/Tools/SearchToolByTag';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const toolsRouter = Router();

toolsRouter.post('/', ensureAuthenticated, CreateTool.execute); // Cadastrar Tool
toolsRouter.get('/', ensureAuthenticated, ListTools.execute); // Listar todas as Tools
toolsRouter.get('/:id', ensureAuthenticated, DetailTool.execute); // Mostrar detalhes de uma Tool
toolsRouter.get('/search/', ensureAuthenticated, SearchToolByTag.execute); // Pesquisar Tool por tag
toolsRouter.put('/:id', ensureAuthenticated, UpdateTool.execute); // Atualizar Tool
toolsRouter.delete('/:id', ensureAuthenticated, DeleteTool.execute); // Deletar Tool

export default toolsRouter;

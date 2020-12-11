import { Router } from 'express';

import CreateTool from '../controllers/Tools/CreateTool';
import UpdateTool from '../controllers/Tools/UpdateTool';
import DeleteTool from '../controllers/Tools/DeleteTool';
import ListTools from '../controllers/Tools/ListTools';
import DetailTool from '../controllers/Tools/DetailTool';
import SearchToolByTag from '../controllers/Tools/SearchToolByTag';

const toolsRouter = Router();

toolsRouter.post('/', CreateTool.execute); // Cadastrar Tool
toolsRouter.get('/', ListTools.execute); // Listar todas as Tools
toolsRouter.get('/:id', DetailTool.execute); // Mostrar detalhes de uma Tool
toolsRouter.get('/search/', SearchToolByTag.execute); // Pesquisar Tool por tag
toolsRouter.put('/:id', UpdateTool.execute); // Atualizar Tool
toolsRouter.delete('/:id', DeleteTool.execute); // Deletar Tool

export default toolsRouter;

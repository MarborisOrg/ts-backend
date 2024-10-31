import { Router } from 'express';
import { saveBookController } from '../controllers/bookController';

const saveRouter = Router();

saveRouter.post('/save', saveBookController);

export default saveRouter;

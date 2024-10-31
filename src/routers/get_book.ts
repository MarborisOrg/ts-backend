import { Router } from 'express';
import { getBookByTitle } from '../controllers/bookController';

const getRouter = Router();

getRouter.get('/get', getBookByTitle );

export default getRouter;

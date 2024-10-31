import { Router, Request, Response } from 'express';
import { findBookByTitle } from '../modules/book/getting/get_book';
import { getBookByTitle } from '../controllers/bookController';

const getRouter = Router();

getRouter.get('/get', getBookByTitle);

export default getRouter;

import { Router, Request, Response } from 'express';
import { findBookByTitle } from '../modules/book/getting/get_book';

const getRouter = Router();

getRouter.get('/get', (req: Request, res: Response) => {

    const title = req.query.title; // title

    if (typeof title === 'string') {
        if (title == null || title == undefined) return;

        res.send(findBookByTitle(title));
    } else {
        res.send('not found');
    }
});

export default getRouter;

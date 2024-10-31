import { Router, Request, Response } from 'express';
import { saveBook } from '../modules/book/saving/save_book';

const saveRouter = Router();

saveRouter.post('/save', (req: Request, res: Response) => {

    const title = req.query.title; // title
    const description = req.query.description; // description

    if (typeof title === 'string' && typeof description === 'string') {
        if (title == null || title == undefined || description == null || description == undefined) return;

        res.send(saveBook(title, description));
    } else {
        res.send('not found');
    }
});

export default saveRouter;

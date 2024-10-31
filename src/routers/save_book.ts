import { Router, Request, Response } from 'express';
import { saveBook } from '../modules/book/saving/save_book';

const saveRouter = Router();

saveRouter.post('/save', async (req: Request, res: Response) => {
    const title = req.body.title; // title
    const description = req.body.description; // description

    if (typeof title === 'string' && typeof description === 'string') {
        try {
            const result = await saveBook(title, description);
            res.send({ success: result });
        } catch (error) {
            console.error('error on saving: ', error);
            res.status(500).send('err on saving!');
        }
    } else {
        res.status(400).send('not type supported!');
    }
});

export default saveRouter;

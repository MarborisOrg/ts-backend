import { Router, Request, Response } from 'express';
import { findBookByTitle } from '../modules/book/getting/get_book';

const getRouter = Router();

getRouter.get('/get', async (req: Request, res: Response) => {

    const title = req.query.title; // title

    if (typeof title === 'string') {
        if (title == null || title == undefined) return;

        try {
            const results = await findBookByTitle(title as string);
            if (results.length > 0) {
                res.send(results);
            } else {
                res.send('book not found');
            }
        } catch (error) {
            res.status(500).send('err');
        }
    } else {
        res.send('not found');
    }
});

export default getRouter;

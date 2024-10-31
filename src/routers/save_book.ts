import { Router, Request, Response } from 'express';

const saveRouter = Router();

saveRouter.get('/get', (req: Request, res: Response) => {

    const title = req.query.title; // title

    if (typeof title === 'string') {
        if (title == null || title == undefined) return;

        res.send();
    } else {
        res.send('not found');
    }
});

export default saveRouter;

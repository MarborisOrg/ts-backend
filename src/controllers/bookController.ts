import { Request, Response } from 'express';
import { findBookByTitle } from '../modules/book/getting/get_book';

export const getBookByTitle = async (req: Request, res: Response) => {
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
};


import { saveBook } from '../modules/book/saving/save_book';

export const saveBookController = async (req: Request, res: Response) => {
    const title = req.body.title; // title
    const description = req.body.description; // description

    if (typeof title === 'string' && typeof description === 'string') {
        try {
            const result = await saveBook(title, description);
            res.send({ success: result });
        } catch (error) {
            console.error('Error on saving: ', error);
            res.status(500).send('Error on saving!');
        }
    } else {
        res.status(400).send('Not type supported!');
    }
};

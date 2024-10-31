import { Request, Response } from 'express';
import Joi from 'joi';
import { findBookByTitle } from '../modules/book/getting/get_book';
import { saveBook } from '../modules/book/saving/save_book';
import { dropBooks } from '../modules/book/drop/books';

const bookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

export const getBookByTitle = async (req: Request, res: Response) => {
    const title = req.query.title;

    const { error } = Joi.string().required().validate(title);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }

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
};

export const saveBookController = async (req: Request, res: Response) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }

    const { title, description } = req.body;

    try {
        const result = await saveBook(title, description);
        res.send({ success: result });
    } catch (error) {
        console.error('Error on saving: ', error);
        res.status(500).send('Error on saving!');
    }
};

export const dropBookController = async (req: Request, res: Response) => {
    try {
        const result = await dropBooks();
        res.send({ success: result });
    } catch (error) {
        console.error('Error on deleting: ', error);
        res.status(500).send('Error on deleting!');
    }
};
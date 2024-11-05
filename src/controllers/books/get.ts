
import { Request, Response } from 'express';
import Joi from 'joi';
import { findBookByTitle } from '@modules/books/find';

export const getBookController = async (req: Request, res: Response) => {
    const title = req.query.title;

    const { error } = Joi.string().required().validate(title);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }else{
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
    }
};

import { Request, Response } from 'express';
import Joi from 'joi';
import { saveBook } from '@modules/books/save';
const bookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

export const saveBookController = async (req: Request, res: Response) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        const { title, description } = req.body;
        try {
            const result = await saveBook(title, description);
            res.send({ success: result });
        } catch (error) {
            console.error('Error on saving: ', error);
            res.status(500).send('Error on saving!');
        }
    }
};
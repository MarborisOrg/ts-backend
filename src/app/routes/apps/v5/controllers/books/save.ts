import { Request, Response } from 'express';
import Joi from 'joi';

import { call } from '#databases/modules/c-call';

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
      const result = await call('save_v5', title, description);
      res.send({ success: result });
    } catch (error) {
      res.status(500).send('err');
    }
  }
};
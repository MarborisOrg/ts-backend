import { Request, Response } from 'express';
import Joi from 'joi';

import { call } from '#databases/modules/database.call.module';

const bookSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const saveBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const { title, description } = req.body;
    try {
      const result = await call('save', title, description);
      res.send({ success: true, output: result });
    } catch (_) {
      res.status(500).send({ success: false, output: null });
    }
  }
};

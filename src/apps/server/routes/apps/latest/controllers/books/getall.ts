import { Request, Response } from 'express';
import Joi from 'joi';

import { call } from '#databases/modules/database.call.module';

const bookSchema = Joi.object({
  page: Joi.number().default(0),
  limit: Joi.number().default(0),
});

export const getAllController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const { page, limit } = req.body;
    try {
      const result = await call('getall', limit, page);
      res.send({ success: true, output: result });
    } catch (_) {
      res.status(500).send({ success: false, output: null });
    }
  }
};

import { Request, Response } from 'express';
import Joi from 'joi';

import { call } from '#databases/database.call.module';

export const getBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.query.id;

  const { error } = Joi.number().required().validate(id);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    try {
      const result = await call('find', id);
      res.send({ success: true, output: result });
    } catch (_) {
      res.status(500).send({ success: false, output: null });
    }
  }
};

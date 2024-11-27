import { Request, Response } from 'express';
import Joi from 'joi';

import { call } from '#databases/modules/c-call';

export const deleteBookController = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;

  const { error } = Joi.string().required().validate(title);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    try {
      const result = await call('delete', title as string);
      res.send({ success: result });
    } catch (_) {
      res.status(500).send('err');
    }
  }
};

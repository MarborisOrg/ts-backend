import { Request, Response } from 'express';

import { call } from '#modules/c-call';

export const dropBookController = async (_req: Request, res: Response) => {
  try {
    const result = await call('drop');
    res.send({ success: result });
  } catch (error) {
    log.error('Error on deleting: ', error);
    res.status(500).send('Error on deleting!');
  }
};

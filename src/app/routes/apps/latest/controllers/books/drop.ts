import { Request, Response } from 'express';

import { call } from '#databases/modules/c-call';

export const dropBookController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await call('drop');
    res.send({ success: result });
  } catch (error) {
    log.error('Error on deleting: ', error);
    res.status(500).send('Error on deleting!');
  }
};

import { Request, Response } from 'express';

import { call } from '#databases/modules/c-call';

export const getAllController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await call('getall');
    res.send({ success: result });
  } catch (_) {
    res.status(500).send('err');
  }
};

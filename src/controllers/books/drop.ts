import { call } from "#modules/c-call";
import { Request, Response } from "express";

export const dropBookController = async (req: Request, res: Response) => {
  try {
    const result = await call("drop");
    res.send({ success: result });
  } catch (error) {
    console.error("Error on deleting: ", error);
    res.status(500).send("Error on deleting!");
  }
};

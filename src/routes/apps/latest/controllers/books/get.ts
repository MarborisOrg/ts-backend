import { Request, Response } from "express";
import Joi from "joi";
import { call } from "#modules/c-call";

export const getBookController = async (req: Request, res: Response) => {
  const title = req.query.title;

  const { error } = Joi.string().required().validate(title);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    try {
      const result = await call("find", title as string);
      res.send({ success: result });
    } catch (error) {
      res.status(500).send("err");
    }
  }
};

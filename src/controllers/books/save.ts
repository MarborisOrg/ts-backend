import { Request, Response } from "express";
import Joi from "joi";
import { call } from "#modules/c-call";
const bookSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const saveBookController = async (req: Request, res: Response) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const { title, description } = req.body; // TODO() Check this params with JOI
    // try {
    //   const result = await saveBook(title, description);
    //   res.send({ success: result });
    // } catch (error) {
    //   log.error("Error on saving: ", error);
    //   res.status(500).send("Error on saving!");
    // }
    try {
      const result = await call("save", title, description);
      res.send({ success: result });
    } catch (error) {
      res.status(500).send("err");
    }
  }
};

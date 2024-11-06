import { Request, Response } from "express";
import { dropBooks } from "../../modules/books/drop.js";

export const dropBookController = async (req: Request, res: Response) => {
  try {
    const result = await dropBooks();
    res.send({ success: result });
  } catch (error) {
    console.error("Error on deleting: ", error);
    res.status(500).send("Error on deleting!");
  }
};

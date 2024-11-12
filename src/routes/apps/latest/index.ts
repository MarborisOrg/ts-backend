import { Router } from "express";
import {
  getBookController,
  saveBookController,
  dropBookController,
} from "#controllers/index";
import checkAdmin from "#middleware/checkAdmin";
import { loginController } from "#controllers/admin/login";
import { checkIP } from "#middleware/cons";
import { tokenController } from "./controllers/token.js";

const router = Router();

router.use(checkIP);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login admin endpoint
 *     description: Returns a token response
 *     responses:
 *       200:
 *         description: A token response
 */
router.post("/login", loginController); // endpoint

router.get("/get", checkAdmin, getBookController);
router.post("/save", checkAdmin, saveBookController);
router.post("/drop", checkAdmin, dropBookController);

router.post("/token", tokenController);

log.info("main router loaded");

export default router;

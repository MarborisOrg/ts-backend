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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A token response
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginController); // endpoint

/**
 * @swagger
 * /get:
 *   get:
 *     summary: Get book endpoint
 *     description: Returns a book response
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer access_token
 *     responses:
 *       200:
 *         description: A book response
 *       400:
 *         description: Invalid title
 */
router.get("/get", checkAdmin, getBookController);

/**
 * @swagger
 * /save:
 *   post:
 *     summary: Save book endpoint
 *     description: Returns a success response
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer access_token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: A success response
 *       400:
 *         description: Invalid book data
 */
router.post("/save", checkAdmin, saveBookController);

/**
 * @swagger
 * /drop:
 *   post:
 *     summary: Drop book endpoint
 *     description: Returns a success response
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer access_token
 *     responses:
 *       200:
 *         description: A success response
 *       500:
 *         description: Error on deleting
 */
router.post("/drop", checkAdmin, dropBookController);

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Token endpoint
 *     description: Returns a new access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: A new access token
 *       401:
 *         description: Invalid refresh token
 */
router.post("/token", tokenController);

log.info("main router loaded");

export default router;

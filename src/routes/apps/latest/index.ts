import { Router } from 'express';

import {
  dropBookController,
  getBookController,
  saveBookController,
} from './controllers/index.js';
import { tokenController } from './controllers/token.js';

import { loginController } from '#routes/apps/latest/controllers/admin/login';
import checkAdmin from '#routes/apps/latest/middleware/checkAdmin';
import { checkIP } from '#routes/apps/latest/middleware/cons';

const router = Router();

router.use(checkIP);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login admin endpoint
 *     description: Returns a token response
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: A token response
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginController);

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
 *         type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer access_token
 *     responses:
 *       200:
 *         description: A book response
 *       400:
 *         description: Invalid title
 */
router.get('/get', checkAdmin, getBookController);

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
 *         type: string
 *         description: Bearer access_token
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - description
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: A success response
 *       400:
 *         description: Invalid book data
 */
router.post('/save', checkAdmin, saveBookController);

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
 *         type: string
 *         description: Bearer access_token
 *     responses:
 *       200:
 *         description: A success response
 *       500:
 *         description: Error on deleting
 */
router.post('/drop', checkAdmin, dropBookController);

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Token endpoint
 *     description: Returns a new access token
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - refreshToken
 *           properties:
 *             refreshToken:
 *               type: string
 *     responses:
 *       200:
 *         description: A new access token
 *       401:
 *         description: Invalid refresh token
 */
router.post('/token', tokenController);

export default router;

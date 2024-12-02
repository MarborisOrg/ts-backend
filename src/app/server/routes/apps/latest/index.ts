import { Router } from 'express';

import {
  deleteBookController,
  dropBookController,
  getAllController,
  getBookController,
  saveBookController,
} from './controllers/index.js';
import { tokenController } from './controllers/token.js';

import { loginController } from '#app/server/routes/apps/latest/controllers/admin/login';
import checkAdmin from '#app/server/routes/apps/latest/middleware/checkAdmin';
import { checkIP } from '#app/server/routes/apps/latest/middleware/cons';

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
 *         name: id
 *         required: true
 *         type: number
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer access_token
 *     responses:
 *       200:
 *         description: A book response
 *       400:
 *         description: Invalid id
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
 * /delete:
 *   post:
 *     summary: Delete a book
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
 *             - id
 *           properties:
 *             id:
 *               type: number
 *     responses:
 *       200:
 *         description: A success response
 *       400:
 *         description: Invalid book data
 */
router.post('/delete', checkAdmin, deleteBookController);

/**
 * @swagger
 * /getall:
 *   post:
 *     summary: Get all books endpoint
 *     description: Returns a list of all books
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer access_token
 *       - in: body
 *         name: body
 *         description: Request body for pagination
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: number
 *               description: The page number to retrieve
 *               default: 0
 *             limit:
 *               type: number
 *               description: The number of items per page
 *               default: 10
 *     responses:
 *       200:
 *         description: A list of all books
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               owners:
 *                 type: array
 *                 items:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post('/getall', checkAdmin, getAllController);

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

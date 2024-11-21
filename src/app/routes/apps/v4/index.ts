import { Router } from 'express';

import {
  dropBookController,
  getBookController,
  saveBookController,
} from '../latest/controllers/index.js';

import { loginController } from './controllers/loginAdmin.js';
import checkAdmin from './middleware/checkAdmin.js';

const router = Router();

/**
 * @swagger
 * /v4/login:
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
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginController);

/**
 * @swagger
 * /v4/get:
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
 * /v4/save:
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
 * /v4/drop:
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

export default router;

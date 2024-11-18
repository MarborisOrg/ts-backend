import { Router } from 'express';

import {
  dropBookController,
  getBookController,
  saveBookController,
} from '../latest/controllers/index.js';

import { loginController } from './controllers/loginAdmin.js';
import checkAdmin from './middleware/checkAdmin.js';

const router = Router();

router.post('/login', loginController); // endpoint
router.get('/get', checkAdmin, getBookController);
router.post('/save', checkAdmin, saveBookController);
router.post('/drop', checkAdmin, dropBookController);

export default router;

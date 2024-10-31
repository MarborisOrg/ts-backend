import { Router } from 'express';
import { getBookByTitle, saveBookController, dropBookController } from '../controllers/bookController';

const router = Router();

router.get('/get', getBookByTitle);
router.post('/save', saveBookController);
router.post('/drop', dropBookController);

export default router;

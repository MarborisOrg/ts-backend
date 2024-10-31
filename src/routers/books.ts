import { Router } from 'express';
import { getBookByTitle, saveBookController } from '../controllers/bookController';

const router = Router();

router.get('/get', getBookByTitle);
router.post('/save', saveBookController);

export default router;

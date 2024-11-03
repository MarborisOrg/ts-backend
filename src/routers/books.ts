import { Router } from 'express';
import { getBookController, saveBookController, dropBookController } from '../controllers';

const router = Router();

router.get('/get', getBookController);
router.post('/save', saveBookController);
router.post('/drop', dropBookController);

export default router;

import { Router } from "express";
import {
  getBookController,
  saveBookController,
  dropBookController,
} from "#controllers/index";
import checkAdmin from "#middleware/checkAdmin";
import { loginController } from "#controllers/admin/login";

const router = Router();

router.post("/v4/login", loginController); // endpoint
router.get("/v4/get", checkAdmin, getBookController);
router.post("/v4/save", checkAdmin, saveBookController);
router.post("/v4/drop", checkAdmin, dropBookController);

console.log('v4 router loaded')

export default router;

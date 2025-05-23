import { Router } from "express";
import { Upload } from "../utils/multer.js";
import { userRegister } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(Upload.single("profilePicture"), userRegister);

export default router;

import { Router } from "express";
import { Upload } from "../utils/multer.js";
import { userRegister, userLogin } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(Upload.single("profilePicture"), userRegister);
router.route("/login").post(userLogin);

export default router;

import { Router } from "express";
import { userSignup } from "../controller/SignupController.js";
import { Login } from "../controller/Login.js";
const router = Router();

router.route("/create").post(userSignup);
router.route("/login").post(Login);

export default router;

import express from "express";
import { handleUserSignup, handleUserSignin,handleUserLogout } from "../controllers/user.js";
const router = express.Router();


router.post("/logout", handleUserLogout);
router.post("/signup", handleUserSignup);
router.post("/signin", handleUserSignin);

export default router;

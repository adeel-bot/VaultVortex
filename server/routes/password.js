import express from "express";
import { getPasswords,setPasswords,updatePassword,deletePassword } from "../controllers/password.js";
const router = express.Router();

router.get('/vortex',getPasswords);
router.post('/vortex',setPasswords);
router.patch('/vortex/:id',updatePassword);
router.delete('/vortex/:id',deletePassword);

export default router;

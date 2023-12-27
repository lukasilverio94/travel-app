import express from "express";
const router = express.Router();
import { signup, login } from "../controller/userController.js";

// User routes
router.post("/new-account", signup); // User signup
router.post("/login", login); // User login

export default router;

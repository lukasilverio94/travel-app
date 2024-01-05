import express from 'express';
const router = express.Router();
import { signup, login, verifyUser,searchUser } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

// User routes
router.post('/new-account', signup); // User signup
router.post('/login', login); // User login
router.get('/me',verifyToken, verifyUser); // User login
router.post('/search', searchUser); // User signup
export default router;

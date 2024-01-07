import express from 'express';
const router = express.Router();
import { signup, login, verifyUser,searchUser ,updateUser} from '../controller/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import upload from "../middlewares/upload.js";

// User routes
router.post('/new-account', signup); // User signup
router.post('/login', login); // User login
router.get('/me',verifyToken, verifyUser); // User login
router.get('/search/:username', searchUser); // User signup
router.put('/update/:id', upload.single('avatar', 10),updateUser)
export default router;

import express from "express";
const router = express.Router();
import { addNewComment,getComments} from "../controller/commentController.js";

// Comment routes

router.post("/newComment", addNewComment); 
router.get("/:id", getComments); 

export default router;

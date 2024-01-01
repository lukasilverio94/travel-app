import express from "express";
const router = express.Router();
import {
  addNewComment,

  deleteComment,
} from "../controller/commentController.js";

// Comment routes

router.post("/newComment", addNewComment);

router.delete("/delete/:id", deleteComment);

export default router;

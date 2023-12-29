import express from "express";
const router = express.Router();
import {
  addNewComment,
  getComments,
  deleteComment,
} from "../controller/commentController.js";

// Comment routes

router.post("/newComment", addNewComment);
router.get("/:id", getComments);
router.delete("/delete/:id", deleteComment);

export default router;

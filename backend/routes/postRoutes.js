import express from "express";
import {
  addNewTravel,
  getAllTravels,
  getTravel,
  updateTravel,
  deleteTravel,
} from "../controller/postController.js";

const router = express.Router();

// Post routes
router.get("/", getAllTravels); // Get All Posts
router.post("/", addNewTravel); // Add New Post
router.get("/:id", getTravel); // Single Post
router.put("/:id", updateTravel); // Edit post
router.delete("/:id", deleteTravel); // Delete post

export default router;

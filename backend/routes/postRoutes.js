import express from "express";
import {
  addNewTravel,
  getAllTravels,
  getTravel,
  updateTravel,
  deleteTravel,
  deletePostImage,
} from "../controller/postController.js";

// middlewares
import upload from "../middlewares/upload.js";

const router = express.Router();

// Post routes
router.get("/", getAllTravels); // Get All Posts
router.post("/", upload.array("images", 10), addNewTravel); // Add New Post
router.get("/details/:id", getTravel); // Single Post
router.put("/update/:id", upload.array("images", 10), updateTravel); // Edit post
router.delete("/delete/:id", deleteTravel); // Delete post
router.delete("/images/delete/:postId/:filename", deletePostImage); //delete image of post

export default router;

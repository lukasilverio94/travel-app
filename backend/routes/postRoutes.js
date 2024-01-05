import express from "express";
import {
  addNewTravel,
  getAllTravels,
  getTravel,
  updateTravel,
  deleteTravel,
} from "../controller/postController.js";

//Upload middleware
import upload from "../middlewares/upload.js";

const router = express.Router();

// Post routes
router.get("/", getAllTravels); // Get All Posts
router.post("/", upload.array("images", 5), addNewTravel); // Add New Post
router.get("/details/:id", getTravel); // Single Post
router.put("/update/:id", updateTravel); // Edit post
router.delete("/delete/:id", deleteTravel); // Delete post

export default router;

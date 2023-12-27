import express from "express";
const router = express.Router();
import {
  addNewTravel,
  getAllTravels,
  getTravel,
  updateTravel,
  deleteTravel,
} from "../controller/postController.js";

import {
  login,
  signup,
} from "../controller/userController.js";
// Post routes
router.get("/", getAllTravels); //Get All Posts
router.post("/", addNewTravel); //Add New Post
router.get("/:id", getTravel); //Single Post
router.put("/:id", updateTravel); //Edit post
router.delete("/:id", deleteTravel); //Delete post

// user routes
router.post('/new-account',signup);
router.post('/logIn', login);

export default router;

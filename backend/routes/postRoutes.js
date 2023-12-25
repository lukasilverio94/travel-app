import express from "express";
const router = express.Router();
import { addNewTravel, getAllTravels } from "../controller/postController.js";

router.get("/", getAllTravels);
router.post("/", addNewTravel);
router.get("/:id");
router.put("/:id");
router.delete("/:id");

export default router;

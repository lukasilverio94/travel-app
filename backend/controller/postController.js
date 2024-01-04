import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import mongoose from "mongoose";

//Add New Travel
export const addNewTravel = async (req, res) => {
  const { title, place, description, writer, rating } = req.body;
  try {
    //Handling Errors (handle in frontend)
    let emptyFields = [];

    if (title.trim() === "") {
      emptyFields.push("title");
    }
    if (place.trim() === "") {
      emptyFields.push("load");
    }
    if (description.trim() === "") {
      emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({
        error: "Please fill in all fields",
        emptyFields,
      });
    }

    //Add Doc
    const newTravel = { title, place, description, writer, rating };

    console.log("Uploaded files:", req.files);

    // Check if there are uploaded images
    if (req.files && req.files.length > 0) {
      newTravel.images = req.files.map((file) => file.path);
    }

    const travel = await Post.create(newTravel);
    console.log("New travel created:", travel);

    // Console log to check if the images are being saved correctly
    console.log("Saved images:", travel.images);

    return res.status(201).json(travel);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "error.message" });
  }
};

//Get All Travels
export const getAllTravels = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  try {
    const travels = await Post.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "comments ratings", // Specify the fields to populate
        options: { sort: { created_at: -1 } }, // Sorting options
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json(travels);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get Single Travel
export const getTravel = async (req, res) => {
  const { id } = req.params;
  //Check if Id matches mongo standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  const travel = await Post.findById(id).populate({
    path: "comments",
    options: { sort: { created_at: -1 } },
  });

  if (!travel) {
    return res.status(404).json({ error: "No such post" });
  }
  return res.status(200).json(travel);
};

//Update Travel
export const updateTravel = async (req, res) => {
  const { id } = req.params;

  // Check if Id matches mongo standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  try {
    let updatedTravel;

    // Check if the 'rating' property is present in the request body
    if ("rating" in req.body) {
      const { rating } = req.body;

      updatedTravel = await Post.findOneAndUpdate(
        { _id: id },
        { $push: { ratings: rating } },
        { new: true }
      );

      res.json({ post: updatedTravel });
    } else {
      // Update general travel information
      updatedTravel = await Post.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      );
      res.json({ post: updatedTravel });
    }
    // Check if the post was found and updated
    if (!updatedTravel) {
      return res.status(404).json({ error: "No such post" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete Travel
export const deleteTravel = async (req, res) => {
  const { id } = req.params;
  //Check if Id matches mongo standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const workout = await Post.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(workout);
};

// Get Image URLs
export const getImgs = async (req, res) => {
  try {
    const images = await Post.find({}, "images");

    const imageUrls = images.flatMap((post) => post.images);

    res.status(200).json({ images: imageUrls });
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

import Post from "../models/postModel.js";

//Add New Travel
export const addNewTravel = async (req, res) => {
  const { title, place, description } = req.body;
  try {
    if (!title || !place || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    //Add Doc
    const newTravel = { title, place, description };
    const travel = await Post.create(newTravel);
    return res.status(201).json(travel);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//Get All Travels
export const getAllTravels = async (req, res) => {
  try {
    const travels = await Post.find({});
    return res.status(200).json(travels);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

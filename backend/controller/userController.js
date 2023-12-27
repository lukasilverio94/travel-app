import  User from '../models/userModel.js';
import mongoose from 'mongoose';


// Function for user signup
export const signup = (req, res) => {
  // Log the incoming request data
  console.log('request to login', req.body);

  // Hash the user's password using bcrypt with a salt factor of 12
  let hashedPass = bcrypt.hashSync(req.body.password, 12);

  // Create a new user object with hashed password
  let userObj = {
    ...req.body,
    password: hashedPass,
  };
  console.log(userObj);

  // Create a new user model instance
  let newUser = new userModel(userObj);

  // Save the new user to the database
  newUser.save()
    .then(() => {
      // Send a success response if the user is saved successfully
      res.status(200).send('User saved successfully');
    })
    .catch((error) => {
      // Handle errors during user saving process
      if (error.code === 11000) {
        // Duplicate key error (unique constraint violation)
        res.status(400).send(`This ${Object.keys(error.keyValue)}: ${Object.values(error.keyValue)} is already used`);
      } else {
        // Other errors
        console.error(error);
        res.status(500).send('An error occurred while saving the user.');
      }
    });
};

// Function for user login
export const login = async (req, res) => {
  // Log the incoming login request data
  console.log("request to", req.body);

  // Find a user in the database with the provided email
  let user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    // If the user is not found, send a 400 Bad Request response
    res.status(400).send('User or password are not correct');
  } else {
    // Compare the provided password with the hashed password stored in the database
    let isCorrectPass = await bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrectPass) {
      // If the password is incorrect, send a 400 Bad Request response
      res.status(400).send('User or password are not correct');
    } else {
      // If the user and password are correct, generate a JWT token for authentication
      let userInfoForToken = {
        id: user._id,
        userName: user.userName,
        email: user.email,
      };

      let userToken = jwt.sign({ userInfoForToken }, 'random text');

      // Send the generated token in the response
      res.status(200).send(userToken);
    }
  }
};
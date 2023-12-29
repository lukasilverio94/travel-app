import dotenv from 'dotenv';
dotenv.config();
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { verifyToken } from '../middlewares/authMiddleware';

//Function sign up
export const signup = async (req, res) => {
  // Hash the user's password using bcrypt with a salt factor of 12
  let hashedPass = bcrypt.hashSync(req.body.password, 12);

  // Create a new user object with hashed password
  let userObj = {
    ...req.body,
    password: hashedPass,
  };

  // Create a new user model instance
  let newUser = new User(userObj);

  try {
    // Save the new user to the database
    console.log('Received signup request:', req.body);
    await newUser.save();

    // Send a success response if the user is saved successfully
    res.status(200).send('User saved successfully');
    console.log('User is saved', req.body);
  } catch (error) {
    // Handle errors during user saving process
    if (error.code === 11000) {
      // Duplicate key error (unique constraint violation)
      res
        .status(400)
        .send(
          `This ${Object.keys(error.keyValue)}: ${Object.values(
            error.keyValue,
          )} is already used`,
        );
    } else {
      // Other errors
      console.error(error);
      res.status(500).send('An error occurred while saving the user.');
    }
  }
};

// Function for user login
export const login = async (req, res) => {
  // Log the incoming login request data
  console.log('Request to login:', req.body);

  try {
    // Find a user in the database with the provided email
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      // If the user is not found, send a 400 Bad Request response
      return res.status(400).send('User or password are not correct');
    }

    // Compare the provided password with the hashed password stored in the database
    let isCorrectPass = await bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!isCorrectPass) {
      // If the password is incorrect, send a 400 Bad Request response
      return res.status(400).json({ error: 'Email or password incorrect' });
    }

    // If the user and password are correct, generate a JWT token for authentication
    let userInfoForToken = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };

    let userToken = jwt.sign({ userInfoForToken }, process.env.SECRET);

    // Send the generated token in the response
    res.status(200).send(userToken);
    console.log(`${userInfoForToken.userName} is inLogged`);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during login.');
  }
};

export const verifyUser = async (req, res) => {
  const token = req.headers.authorization;
  console.log('Token:', token);

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
    console.log('Decoded:', decoded);

    res.status(200).json({
      userId: decoded?.userInfoForToken?.id,
      username: decoded?.userInfoForToken?.userName,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};




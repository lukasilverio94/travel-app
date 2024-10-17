import mongoose from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  avatar: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

// Validation schema using Joi
const validateUser = (user) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
};

export { User as default, validateUser };

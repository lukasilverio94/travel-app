import mongoose from "mongoose";
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
  // userName:{
  //   type:String,
  //   required: true,
  // },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: false,
  // },
  commentText: {
    type: String,
    required: false,
  },
  // commentOwner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', // Reference to the User model
  //   required: true,
  // },
  created_at: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: false,
  },

}
,
  { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

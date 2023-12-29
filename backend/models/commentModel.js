import mongoose from "mongoose";
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
  
  writer: {
    type: String,
    // ref: 'User',
    required: false,
  },
  commentText: {
    type: String,
    required: false,
  },
  
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

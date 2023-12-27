import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // postOwner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User', 
    //   required: true,
    // },
  
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

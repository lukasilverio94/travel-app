import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import mongoose from 'mongoose';

export const addNewComment = async (req, res) => {
  console.log('comment request', req.body);

  const postId = req.body.postId;
  const comment = new Comment({
    commentText: req.body.commentText,
    writer: req.body.writer,
  });

  await comment.save();
  const thePost = await Post.findById(postId);

  thePost.comments.push(comment);
  await thePost.save();
  console.log('comment is pushed to post', req.body);

  res.status(200).json({ success: true });
};


//Delete comment
export const deleteComment = async (req, res) => {
  
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Comment" });
  }

  const workout = await Comment.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "Comment such post" });
  }

  res.status(200).json(workout);
};

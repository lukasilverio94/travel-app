import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import mongoose from 'mongoose';


export const addNewComment = async (req, res) => {
  console.log('comment request', req.body);

  const postId = req.body.postId;
  const comment = new Comment({
    commentText: req.body.commentText,
  });

  await comment.save();
  const thePost = await Post.findById(postId);

  thePost.comments.push(comment);
  await thePost.save();
  console.log('comment is pushed to post', req.body);

  res.status(200).json({ success: true });
};

export const getComments = async (req, res) => {
  const commentId = req.params.id;
  // console.log('commentId',commentId);

  try {
    
    const comment = await Comment.findById(commentId);
    // console.log('Comment details:', comment); 
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error('Error fetching comment details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  

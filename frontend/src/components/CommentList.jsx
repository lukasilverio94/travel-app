import  { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CommentList = ({ post }) => {
  const [comments, setComments] = useState([]);

// CommentList.jsx
useEffect(() => {
  const fetchComments = async () => {
    try {
      // console.log('Post comments:', post.comments); // Add this log

      const commentDetails = await Promise.all(
        post.comments.map(async (commentId) => {
          const response = await axios.get(`/comments/${commentId}`);
          // console.log('Comment details:', response.data);
          // console.log('Comment text:', response.data.commentText);
          return response.data;
        })
      );

      // console.log('Comments:', commentDetails);
      setComments(commentDetails);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  fetchComments();
}, [post.comments]);


return (
  <div>
    <h3>Comments:</h3>
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>{comment.commentText}</li>
      ))}
    </ul>
  </div>
);
};

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentList;

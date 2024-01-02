import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { MdOutlineDelete } from "react-icons/md";

const CommentList = ({ post }) => {
  const [comments, setComments] = useState(post.comments); // Use state to manage comments
  const [refresh, setRefresh] = useState(false);

  // Fetch comments when the component mounts or when 'refresh' changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/details/${post._id}`);
        setComments(response.data.comments);
        setRefresh((prevRefresh) => !prevRefresh);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post._id, refresh]);

  // Delete Comment
  const handleDeleteComment = (id) => {
    axios
      .delete(`/comments/delete/${id}`)
      .then(() => {
        // Toggle the refresh state to trigger a re-render
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  return (
    <div>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className="pt-2">
            <strong>{comment.writer}: </strong>
            <div className="flex items-center justify-between">
              <p>{comment.commentText}</p>
              {JSON.parse(localStorage.getItem("user")).username ===
                comment.writer && (
                <button onClick={() => handleDeleteComment(comment._id)}>
                  <MdOutlineDelete className="text-red-600 text-3xl cursor-pointer" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentList;

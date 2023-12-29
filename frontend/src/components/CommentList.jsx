import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { MdOutlineDelete } from "react-icons/md";

const CommentList = ({ post }) => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  // CommentList.jsx
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentDetails = await Promise.all(
          post.comments.map(async (commentId) => {
            const response = await axios.get(`/comments/${commentId}`);

            return response.data;
          })
        );

        setComments(commentDetails);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post.comments]);

  //Delete Comment
  const handleDeleteComment = (id) => {
    axios
      .delete(`/comment/delete/${id}`)
      .then(() => {
        useNavigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className="pt-2">
            <strong>{comment.writer}: </strong>
            <div>
              <p>{comment.commentText}</p>
              <button onClick={() => handleDeleteComment(comment._id)}>
                <MdOutlineDelete className="text-red-600 text-3xl cursor-pointer" />
              </button>
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

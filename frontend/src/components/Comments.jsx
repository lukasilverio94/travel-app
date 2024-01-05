import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CommentList from "./CommentList";

export default function Comments({ post }) {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState({
    postId: post._id,
    commentText: "",
    writer: JSON.parse(localStorage.getItem("user")).username,
  });

  const [refreshComments, setRefreshComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleShowComment = () => {
    setShowComment((prevShowComment) => !prevShowComment);
  };

  const submitComment = (e) => {
    e.preventDefault();

    if (comment.commentText.trim() !== "") {
      setLoading(true);

      axios
        .post("/comments/newComment", comment, {
          withCredentials: true,
        })
        .then((result) => {
          
          setComment({ ...comment, commentText: "" }); 
          // Toggle the refreshComments state to trigger a re-render of CommentList
          setRefreshComments((prevRefresh) => !prevRefresh);
        })
        .catch((err) => {
          console.error("Error posting comment", err);
          setError("Error posting comment");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Comment text is required");
    }
  };

  return (
    <div className="container mb-2">
      <form onSubmit={submitComment} className="max-w-md">
        <input
          className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
          type="text"
          placeholder={`add a comment to ${post.writer}`}
          value={comment.commentText}
          onChange={(e) =>
            setComment({ ...comment, commentText: e.target.value })
          }
        />
        <button
          className="w-full bg-teal-500 text-white py-2 rounded"
          type="submit"
        >
          {loading ? "Posting..." : "Comment"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={toggleShowComment} className="my-2 italic text-teal-600">
        {showComment ? "Hide Comment" : "View all Comments"}
      </button>
      {showComment && <CommentList post={post} refresh={refreshComments} />}{" "}
      {/* Pass the refresh state to CommentList */}
    </div>
  );
}

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

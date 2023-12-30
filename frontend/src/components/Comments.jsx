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
          console.log("Comment added: ", result.data);
          setComment({ ...comment, commentText: "" }); // Clear the input field
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

  useEffect(() => {
    // You can perform additional actions or side effects after state updates here
  }, [comment]); // Add dependencies if needed

  return (
    <div>
      <form onSubmit={submitComment} className="w-96">
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
      <button onClick={toggleShowComment}>
        {showComment ? "Hide Comment" : "View all Comments"}
      </button>
      {showComment && <CommentList post={post} />}
    </div>
  );
}

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

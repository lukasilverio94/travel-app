// Comments.jsx
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CommentList from "./CommentList"; // Import the CommentList component

export default function Comments({ post }) {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState({
    postId: post._id,
    commentText: "",
    writer: JSON.parse(localStorage.getItem("user")).username 
  });

  const toggleShowComment = () => {
    setShowComment((prevShowComment) => !prevShowComment);
  };

  const submitComment = (e) => {
    e.preventDefault();
    console.log(comment.postId);

    if (comment.commentText !== "") {
      axios
        .post("/comments/newComment", comment, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result.data);
          setComment({ ...comment, commentText: "" }); // Clear the input field
        })
        .catch((err) => {
          console.log("comment doesnt post", err);
        });
    } else {
      console.log("Comment text is required");
    }
  };

  return (
    <div>
      <form onSubmit={submitComment} className="w-96">
        <input
          className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
          type="text"
          placeholder={`add a comment to ${post.writer}`}
          onChange={(e) =>
            setComment({ ...comment, commentText: e.target.value })
          }
        />
        <button
          className="w-full bg-teal-500 text-white py-2 rounded"
          type="submit"
        >
          Comment
        </button>
      </form>
      <button onClick={toggleShowComment}>
        {showComment ? "Hide Comment" : "View all Comments"}
      </button>
      {showComment && <CommentList post={post} />}{" "}
      {/* Pass the entire post object to CommentList */}
    </div>
  );
}

Comments.propTypes = {
  post: PropTypes.object.isRequired, // Adjust propTypes to expect a post object
};

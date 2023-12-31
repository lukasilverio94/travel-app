import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { MdOutlineDelete } from "react-icons/md";

const CommentList = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const [refresh, setRefresh] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [reply, setReply] = useState({ replyText: '' });
  const [loading, setLoading] = useState(false);

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

  const handleReplyMode = () => {
    setIsReplyMode(!isReplyMode);
    // Additional logic for handling reply mode, if needed
  };

  const submitReply = async (e, commentId) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.put(`/comments/update/${commentId}`, {
        replyText: reply.replyText,writer: JSON.parse(localStorage.getItem('user')).username
      });
  console.log(response);
      // Update the comment in the state with the new reply
      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [...comment.replies, response.data.comment] }
            : comment
        );
        return updatedComments;
      });
  
      setReply({ replyText: '' });
      setIsReplyMode(false);
      setLoading(false);
    } catch (error) {
      console.error('Error updating comment:', error);
      setLoading(false);
    }
  };
  

  const handleDeleteComment = (id) => {
    axios
      .delete(`/comments/delete/${id}`)
      .then(() => {
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h3>Comments:</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment._id}
            className="pt-2 bg-slate-100 p-3 my-2 lg:w-full"
          >
            <strong>{comment.writer}: </strong>
            <div className="flex items-center justify-between">
              <p>{comment.commentText}</p>
              <ul>
                {comment.replies.map((reply) => (
                  <li key={reply._id}>
                    <strong>{reply.writer} </strong>
                    <p>{reply.replyText}</p>
                  </li>
                ))}
              </ul>
              {user && user.username === comment.writer ? (
                <div>
                  {isReplyMode ? (
                    <form onSubmit={(e) => submitReply(e, comment._id)} className="max-w-md">
                      <input
                        className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
                        type="text"
                        placeholder={`add a reply to ${comment.writer}'s comment `}
                        onChange={(e) => setReply({ ...reply, replyText: e.target.value })}
                      />
                      <button
                        className="w-full bg-teal-500 text-white py-2 rounded"
                        type="submit"
                      >
                        {loading ? 'Posting...' : `Send reply `}
                      </button>
                    </form>
                  ) : null}
                  <button onClick={handleReplyMode}>
                    Reply
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    <MdOutlineDelete className="text-red-600 text-3xl cursor-pointer mb-4" />
                  </button>
                </div>
              ) : (
                <div>
                  {isReplyMode ? (
                    <form onSubmit={(e) => submitReply(e, comment._id)} className="max-w-md">
                      <input
                        className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
                        type="text"
                        placeholder={`add a reply to ${comment.writer}'s comment `}
                        onChange={(e) => setReply({ ...reply, replyText: e.target.value })}
                      />
                      <button
                        className="w-full bg-teal-500 text-white py-2 rounded"
                        type="submit"
                      >
                        {loading ? 'Posting...' : `Send reply `}
                      </button>
                    </form>
                  ) : null}
                  <button onClick={handleReplyMode}>
                    Reply
                  </button>
                </div>
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

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDistance } from "date-fns"; //To format date
import Comments from "./Comments";
import PropTypes from 'prop-types';
import Stars from "./Stars";
import axios from "axios";

const Post = ({ post }) => {
  // const [newRating, setNewRating] = useState(0);
  // const [localPost, setLocalPost] = useState(post);
  const handleRatingChange = async (updatedPost) => {
    try {
      // Update the server with the new rating
      const response = await axios.put(`/posts/update/${post._id}`, {
        rating: updatedPost.rating,
      });
      console.log("Rating updated on server:", response.data);
  
      // Update the post state with the new rating
      // setLocalPost(updatedPost);
    } catch (error) {
      console.error("Error updating rating on server:", error);
    }
  };

  
  
  return(
  <div key={post._id} className="flex flex-col gap-y-2 mt-2">
    <h3 className="text-teal-600 text-3xl ">{post.title}</h3>
    <h2 className="font-semibold text-xl">Place: </h2>
    <p className="text-slate-800 text-2xl "> {post.place}</p>
    <h5 className="text-slate-900 font-semibold">Description: </h5>
    <p>{post.description.slice(0, 25)}...</p>
    <small>
      {formatDistance(new Date(post.createdAt), new Date(), {
        addSuffix: true,
      })}{" "}
      by {post.writer}
    </small>

    {post.image && (
      <img
        className="rounded-md w-full md:w-1/3 mb-4 md:mb-0 md:mr-4"
        src={post.image}
        alt="Post"
      />
    )}

    {/* comment */}
    <Comments post={post} />

    {/* <Link to={`posts/details/${post._id}`}>Read more...</Link> */}
    <hr />
    <Stars post={post} onRatingChange={handleRatingChange} />
    {/* <Stars post={post} /> */}
    <Link to={`posts/details/${post._id}`} className="border-b-2 pb-5 my-2">
      <span className="bg-slate-900 text-white px-2 py-2 rounded-md hover:bg-teal-500">
        Read more
      </span>
    </Link>
  </div>
)}
Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    // Add other properties of the post object as needed
  }).isRequired,
};
export default Post;

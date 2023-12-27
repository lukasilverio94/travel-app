import React from "react";
import { Link, useParams } from "react-router-dom";

const Post = ({ post }) => (
  <div key={post._id} className="flex flex-col gap-y-3 mt-2">
    <h3 className="text-teal-600 text-3xl ">{post.title}</h3>
    <p className="text-slate-800 font-semibold">Place: {post.place}</p>
    <p>{post.description}</p>
    <small>{post.createdAt}</small>
    <Link to={`posts/details/${post._id}`}>Read more...</Link>
  </div>
);

export default Post;

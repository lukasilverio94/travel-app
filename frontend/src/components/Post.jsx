import React from "react";
import { Link, useParams } from "react-router-dom";
import Stars from "./Stars";

const Post = ({ post }) => (
  <div key={post._id} className="flex flex-col gap-y-2 mt-2">
    <h3 className="text-teal-600 text-3xl ">{post.title}</h3>
    <h2 className="font-semibold text-3xl">Place: </h2>
    <p className="text-slate-800 text-2xl "> {post.place}</p>
    <h5 className="text-slate-900 font-semibold">Description: </h5>
    <p>{post.description.slice(0, 25)}...</p>
    <small>{post.createdAt}</small>
    <Stars />
    <Link to={`posts/details/${post._id}`} className="border-b-2 pb-5 my-2">
      <span className="bg-slate-900 text-white px-2 py-2 rounded-md">
        Read more...
      </span>
    </Link>
  </div>
);

export default Post;

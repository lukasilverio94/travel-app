import React from "react";

const Post = ({ post }) => (
  <div key={post._id} className="flex flex-col gap-y-3 mt-2">
    <h3 className="text-teal-600 text-3xl ">{post.title}</h3>
    <p className="text-slate-800 font-semibold">Place: {post.place}</p>
    <p>{post.description}</p>
    <small>{post.createdAt}</small>
  </div>
);

export default Post;

import React from "react";

const Post = ({ post }) => (
  <div key={post._id} className="flex flex-col gap-y-3 mt-3">
    <h3 className="text-slate-900 text-3xl py-2">{post.title}</h3>
    <p>{post.description}</p>
    <small>{post.createdAt}</small>
  </div>
);

export default Post;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container px-6">
      <h1 className="text-4xl py-3 text-teal-700 font-semibold border-b-2 border-teal-700">
        Get inspired by some experiences:
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="container flex flex-col  mt-2">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;

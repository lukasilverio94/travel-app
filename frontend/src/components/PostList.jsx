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
    <div>
      <h1 className="text-4xl py-3 text-teal-700  border-b-2 border-teal-700">
        Read all travels experiences:
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="container flex flex-col gap-y-3 mt-3">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;

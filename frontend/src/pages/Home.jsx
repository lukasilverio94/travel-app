// import React from "react";
import PostList from "../components/PostList";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="p-4">
      <div className="container">
        <PostList />
      </div>
    </div>
  );
};

export default Home;
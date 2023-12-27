// import React from "react";
import PostList from "../components/PostList";
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className="p-4">
      <Link to="/signIn">
        <h2>Sign In!</h2>
      </Link>


      <div className="container">
        <PostList />
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const DeletePost = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeletePost = () => {
    setLoading(true);
    axios
      .delete(`/posts/delete/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center my-4">Delete Post</h1>
      {loading ? <Loader /> : ""}
      <div className="flex flex-col items-center border-2 border-teal-400 rounded-xl w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this post?</h3>

        <button
          className="p-4 bg-red-600 text-white mt-8 mb-4 w-full"
          onClick={handleDeletePost}
        >
          Yes, Delete it
        </button>
        <Link
          to="/"
          className="p-4 bg-slate-800 text-white text-center m-auto w-full"
        >
          No, go back
        </Link>
      </div>
    </div>
  );
};

export default DeletePost;

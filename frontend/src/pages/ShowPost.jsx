import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
// Components
import Loader from "../components/Loader";
import Stars from "../components/Stars";

export default function ShowPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/posts/details/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      key={post._id}
      className="container mx-6 flex flex-col max-w-5xl  gap-y-3 mt-5 "
    >
      <h3 className="text-teal-600 text-3xl ">{post.title}</h3>
      <p className="text-slate-800 font-semibold">Place: {post.place}</p>
      <p>{post.description}</p>
      <small>{post.createdAt}</small>
      <Stars />
      <Link to={`/posts/delete/${id}`}>
        <span className="bg-red-600 my-3 text-white px-2 py-2 rounded-md">
          Delete
        </span>
      </Link>
    </div>
  );
}

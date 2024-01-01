import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Stars from "../components/Stars";

export default function ShowPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/posts/details/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/posts/update/${id}`, post);
      console.log("Post updated successfully:", response.data);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="container mx-6 flex flex-col max-w-5xl gap-y-3 mt-5">
      {JSON.parse(localStorage.getItem("user")).username === post.writer ? (
        <div>
          <h3 className="text-teal-600 text-3xl">
            {isEditMode ? (
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleInputChange}
                className="border-b-2 border-teal-600 focus:outline-none"
              />
            ) : (
              post.title
            )}
          </h3>
          <p className="text-slate-800 font-semibold">
            {isEditMode ? (
              <input
                type="text"
                name="place"
                value={post.place}
                onChange={handleInputChange}
                className="border-b-2 border-teal-600 focus:outline-none"
              />
            ) : (
              post.place
            )}
          </p>
          {isEditMode ? (
            <textarea
              name="description"
              value={post.description}
              onChange={handleInputChange}
              className="border-2 border-teal-600 focus:outline-none"
            />
          ) : (
            <p>{post.description}</p>
            
          )}
          <Stars />
          <div className="flex items-center gap-2">
            <Link to={`/posts/delete/${id}`}>
              <span className="bg-red-600 my-3 text-white px-2 py-2 rounded-md">
                Delete
              </span>
            </Link>
            {isEditMode && (
              <button
                className="bg-slate-600 my-3 text-white px-2 py-2 rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
            )}
            {!isEditMode && (
              <button
                className="bg-slate-600 my-3 text-white px-2 py-2 rounded-md"
                onClick={handleEditMode}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          
          
          
          <h3 className="text-teal-600 text-3xl">{post.title}</h3>
          <p className="text-slate-800 font-semibold">{post.place}</p>
          <p>{post.description}</p>
          <Stars />
        </>
      )}
    </div>
  );
}

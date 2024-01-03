import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";

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
    <div className="container mx-auto p-6 ">
      <BackButton />
      {JSON.parse(localStorage.getItem("user")).username === post.writer ? (
        <div className="bg-white p-6 rounded-md shadow-md mt-7">
          <h3 className="text-teal-600 text-3xl mb-4">
            {isEditMode ? (
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleInputChange}
                className="w-full border-b-2 border-teal-600 focus:outline-none text-xl"
              />
            ) : (
              post.title
            )}
          </h3>
          <p className="text-slate-800 font-semibold mb-2">
            {isEditMode ? (
              <input
                type="text"
                name="place"
                value={post.place}
                onChange={handleInputChange}
                className="w-full border-b-2 border-teal-600 focus:outline-none"
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
              className="w-full border-2 border-teal-600 focus:outline-none mb-4 resize-y"
              style={{ minHeight: "100px" }}
            />
          ) : (
            <p className="text-slate-900 mb-4 leading-snug">
              {post.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-6">
            <Link to={`/posts/delete/${id}`}>
              <span className="bg-red-600 text-white px-4 py-2 rounded-md">
                Delete
              </span>
            </Link>
            {isEditMode && (
              <button
                className="bg-teal-600 text-white px-4 py-2 rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
            )}
            {!isEditMode && (
              <button
                className="bg-slate-600 text-white px-4 py-2 rounded-md"
                onClick={handleEditMode}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-teal-600 text-3xl mt-4">{post.title}</h3>
          <p className="text-slate-800 font-semibold mt-2">{post.place}</p>
          <p className="text-slate-900 mt-4 leading-snug">{post.description}</p>
        </>
      )}
    </div>
  );
}

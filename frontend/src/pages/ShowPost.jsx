import PostDetails from "../components/PostDetails";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import BackButton from "../components/BackButton";
import axios from "axios";

const ShowPost = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newImage, setNewImage] = useState(null);
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
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Function to handle image upload

  const handleImageUpload = async (files) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await axios.put(`/posts/update/${id}`, formData);
      console.log(response.data.post);
      setPost(response.data.post);
    } catch (error) {
      console.error("Error updating post with new image:", error);
    }
  };

  const handleImageDelete = async (index) => {
    try {
      const filename = post.images[index].slice(-24);
      await axios.delete(`/posts/images/delete/${post._id}/${filename}`);
      setPost((prevPost) => ({
        ...prevPost,
        images: prevPost.images.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="container mx-auto p-10 mt-20 mb-8 overflow-hidden ">
      <BackButton />
      {JSON.parse(localStorage.getItem("user")).username === post.writer ? (
        <>
          <PostDetails
            post={post}
            isEditMode={isEditMode}
            handleSave={handleSave}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            handleImageDelete={handleImageDelete}
            handleEditMode={handleEditMode}
          />
          {/* Add new image */}
          <div className="mb-4">
            <label
              htmlFor="newImage"
              className="text-green-900 block mt-5 text-2xl"
            >
              Add new image(s) to current post
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files)}
              className="border-2 p-2 mt-2"
            />
            <button
              onClick={() => handleImageUpload(newImage)}
              className="bg-gray-800 text-white p-3 px-5 mt-2 rounded"
            >
              Upload
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-teal-600 text-3xl mt-4">{post.title}</h3>
          <p className="text-slate-800 font-semibold mt-2">{post.place}</p>
          <p className="text-slate-900 mt-4 leading-snug">{post.description}</p>
        </>
      )}
    </div>
  );
};

export default ShowPost;

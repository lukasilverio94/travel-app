import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Loader from "../components/Loader";

import BackButton from "../components/BackButton";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [postId, setPostId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Add Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("place", place);
      formData.append("description", description);
      formData.append("images", files[0]);
      formData.append(
        "writer",
        JSON.parse(localStorage.getItem("user")).username
      );
      // Log the contents of the files array
      console.log("Files:", files);

      // Append each file to the FormData

      setLoading(true);

      const response = await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data);
      setPostId(response.data._id);

      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);

      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="p-4">
      <BackButton />
      <form
        className="flex flex-col border-2 border-teal-700 rounded-xl w-full sm:w-100 lg:w-1/2 p-4 mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl my-4">Create Travel Story: </h1>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Post title</label>
          <input
            type="text"
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="Title for your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Location</label>
          <input
            type="text"
            className="border-2 border-gray-500 px-4 py-2  w-full "
            placeholder="location where happened the adventure"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <textarea
            className="border-2 border-gray-500 px-4 py-2  w-full resize-none"
            placeholder="Tell us your experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {/* Upload image */}
        <div>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>

        <button
          className="p-2 bg-teal-700 w-100 text-white my-3"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}
      </form>
    </div>
  );
}

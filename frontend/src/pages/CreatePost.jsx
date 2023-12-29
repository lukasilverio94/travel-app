import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Add Post
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      place,
      description,
      writer: JSON.parse(localStorage.getItem("user")).username
    };
    setLoading(true);
    axios
      .post("/posts", data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
          console.error("Server Error:", error);
        }
      });
  };

  return (
    <div className="p-4">
      <form
        className="flex flex-col border-2 border-teal-700 rounded-xl w-full sm:w-100 lg:w-1/2 p-4 mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl my-4">Create Travel Story: </h1>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="Title for your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Place</label>
          <input
            type="text"
            className="border-2 border-gray-500 px-4 py-2  w-full "
            placeholder="Name of the place about the history"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <textarea
            type="number"
            className="border-2 border-gray-500 px-4 py-2  w-full resize-none"
            placeholder="Describe your experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="p-2 bg-teal-700 w-100 text-white    mb-3">
          Save
        </button>
        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}
      </form>
    </div>
  );
}

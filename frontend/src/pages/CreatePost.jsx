import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isImageValid } from "../utils/imageFormatUtils.js";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
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
      formData.append(
        "writer",
        JSON.parse(localStorage.getItem("user")).username
      );
      formData.append(
        "writerId",
        JSON.parse(localStorage.getItem("user")).userId
      );
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      // Check if the image format is valid
      if (!isImageValid(files)) {
        setError(
          "Some of the selected files are not in a supported. Please only upload files in JPEG or PNG format."
        );

        // clear the error message after 3 seconds
        setTimeout(() => {
          setError(null);
        }, 4000);

        return;
      }

      setLoading(true);

      const response = await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Post added successfully", {
        autoClose: 1000,
        position: "top-right",
      });

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
    <div className="p-4 mt-20">
      <BackButton />
      <form
        encType="multipart/form-data"
        className="flex flex-col mb-6 rounded-xl w-full sm:w-100 lg:max-w-[800px] p-3 m-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl lg:text-5xl sm:text-3xl my-2 text-teal-600 underline">
          New post:
        </h1>
        <div className="my-3">
          <label className="text-xl mr-4 text-gray-600">Post title</label>
          <input
            type="text"
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
            placeholder="Title for your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="my-3">
          <label className="text-xl mr-4 text-gray-600">Location</label>
          <input
            type="text"
            className="border-2 border-gray-500 px-4 py-2  w-full rounded-lg"
            placeholder="Location from your adventure"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
        <div className="my-3">
          <label className="text-xl mr-4 text-gray-600">Description</label>
          <textarea
            className="border-2 border-gray-500 px-4 py-2 w-full min-h-20 resize-none rounded-lg"
            placeholder="Tell us your experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {/* Upload image */}
        <div>
          <h4 className="text-teal-600 text-lg font-semibold">
            Add images to post
          </h4>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>

        <button
          className="rounded-lg p-2 bg-teal-700 w-100 text-white my-3"
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

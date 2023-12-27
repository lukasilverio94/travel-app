import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-4">
      <form className="flex flex-col border-2 border-teal-700 rounded-xl w-full sm:w-100 lg:w-1/2 p-4 mx-auto">
        <h1 className="text-3xl my-4">Create Travel Story: </h1>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="Title for your experience"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Place</label>
          <input
            type="text"
            className="border-2 border-gray-500 px-4 py-2  w-full "
            placeholder="Name of the place about the history"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <textarea
            type="number"
            className="border-2 border-gray-500 px-4 py-2  w-full resize-none"
            placeholder="Describe your experience..."
          />
        </div>
        <button className="p-2 bg-teal-700  text-white m-8">Save</button>
      </form>
    </div>
  );
}

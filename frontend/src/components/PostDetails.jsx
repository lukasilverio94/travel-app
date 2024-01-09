import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import AlertBox from "../components/AlertBox";

const PostDetails = ({
  post,
  isEditMode,
  handleInputChange,
  handleImageDelete,
  handleSave,
  handleEditMode,
}) => {
  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md mt-7">
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
          style={{
            minHeight: "200px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        />
      ) : (
        <p className="text-slate-900 mb-4 leading-snug break-words overflow-hidden">
          {post.description}
        </p>
      )}

      <div className="flex items-center gap-4 mt-2">
        <Link to={`/posts/delete/${post._id}`}>
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
            className="bg-slate-800 text-white px-4 py-2 rounded-md"
            onClick={handleEditMode}
          >
            Edit
          </button>
        )}
      </div>

      {/* Render images */}
      {post.images.length > 0 && <AlertBox />}
      {post.images && post.images.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {post.images.map((image, index) => (
            <div key={index} className="relative">
              {/* Display image */}
              <img
                src={`http://localhost:4000/uploads/${image.slice(-24)}`}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onClick={() => console.log(`Clicked on image ${index + 1}`)}
              />
              {/* Delete button (visible to the post owner) */}
              {JSON.parse(localStorage.getItem("user")).username ===
                post.writer && (
                <button
                  className="absolute top-2 right-2 text-2xl bg-transparent text-white px-2 py-1 rounded-md"
                  onClick={() => handleImageDelete(index)}
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {/* End images */}
    </div>
  );
};

export default PostDetails;

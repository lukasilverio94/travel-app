import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

export default function Stars({ post, onRatingChange }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    // Check if post is defined before trying to access its properties
    if (post && post._id) {
      console.log(post);
      setRating(post.rating);
    }
  }, [post]);

  const handleRatingChange = (newRating) => {
    console.log("New rating:", newRating);
    // Update the local state
    setRating(newRating);

    // Update the post object with the new rating
    if (post) {
      const updatedPost = {
        ...post,
        rating: newRating,
      };

      // Call the onRatingChange callback with the updated post
      if (onRatingChange) {
        onRatingChange(updatedPost);
      }
    }
  };

  return (
    <>
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={Math.random() * 1000000}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => handleRatingChange(currentRating)}
                className="hidden"
              />
              <FaStar
                className="cursor-pointer"
                size={20}
                color={
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>

      <p className="text-slate-500">Rating: {rating}</p>
    </>
  );
}

Stars.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    // Add the rating property to propTypes
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    // Add other properties of the post object as needed
  }),
  onRatingChange: PropTypes.func.isRequired, // Ensure onRatingChange is a required function prop
};

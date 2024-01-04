import { Link } from "react-router-dom";
import { formatDistance } from "date-fns"; //To format date
import { FaArrowRightLong } from "react-icons/fa6";
import Comments from "./Comments";
import PropTypes from "prop-types";
import Stars from "./Stars";
import axios from "axios";
import { useEffect, useState } from "react";

const Post = ({ post }) => {
  const [imgData, setImgData] = useState([]);

  const imageUrls = post.images.map((imageUrl) => `/uploads/${imageUrl}`);
  console.log("Image URLs:", imageUrls);

  if (imageUrls.length === 0) {
    console.warn("No image URLs found. Check the post data.");
  }

  const handleRatingChange = async (updatedPost) => {
    try {
      // Update the server with the new rating
      await axios.put(`/posts/update/${post._id}`, {
        rating: updatedPost.rating,
      });
    } catch (error) {
      console.error("Error updating rating on server:", error);
    }
  };

  useEffect(() => {
    axios
      .get("/posts/get-imgs")
      .then((res) => {
        console.log(res.data.images[0]);
        setImgData(res.data.images);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div
      key={post._id}
      className="w-full flex flex-col border-b-2 pb-5 mt-5 mb-3 md:col-span-1"
    >
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-2/3 flex flex-col gap-y-1 flex-grow">
          <h3 className="text-teal-600 text-3xl">{post.title}</h3>
          <div className="my-1">
            <Stars post={post} onRatingChange={handleRatingChange} />
          </div>

          <p className="text-slate-800 text-2xl"> {post.place}</p>
          <p>{post.description.slice(0, 25)}...</p>
          <Link to={`posts/details/${post._id}`} className="my-1">
            <span className="flex items-center text-teal-700">
              <span className="hover:border-b hover:border-teal-700">
                Read more
              </span>
              <FaArrowRightLong className="ms-1" />
            </span>
          </Link>
          <small>
            {formatDistance(new Date(post.createdAt), new Date(), {
              addSuffix: true,
            })}{" "}
            by {post.writer}
          </small>
          {/* comment */}
          <Comments post={post} />
        </div>

        {imgData.length > 0 && (
          <img
            className="rounded-md w-full max-w-[500px] mb-4 md:mb-0 md:mr-4"
            src={`/uploads/${imgData[0]}`} // Assuming you want to display the first image
            alt={`Photo from ${post.place}`}
          />
        )}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    writer: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default Post;

import { Link } from "react-router-dom";
import { formatDistance } from "date-fns"; //To format date
import { FaArrowRightLong } from "react-icons/fa6";
import Comments from "./Comments";
import PropTypes from "prop-types";
import Stars from "./Stars";
import Carousel from "./Carousel";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const Post = ({ post }) => {
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

  const averageRating =
    post.ratings && post.ratings.length > 0
      ? post.ratings.reduce((sum, rating) => sum + rating, 0) /
        post.ratings.length
      : 0;
  return (
    <div
      key={post._id}
      className="w-full flex flex-col border-b-2 pb-5 mt-5 mb-3 md:col-span-1"
    >
      <div className="flex flex-col md:flex-row ">
        <div className="w-full md:w-full sm:w-full lg:w-2/3 flex flex-col gap-y-1 flex-grow">
          <h3 className="text-teal-600 text-3xl">
            {post.title}
            {/* <span className="cursor-pointer">
              <FaStar size={70} color={"#gggggg"} />
              {averageRating}
            </span> */}
          </h3>
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

          <Comments post={post} />
        </div>
        {post.images && (
          <Carousel
            images={post.images.map((image) => ({
              url: `http://localhost:4000/uploads/${image.slice(-24)}`,
            }))}
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
    images: PropTypes.array,
    ratings: PropTypes.array,
  }).isRequired,
};

export default Post;

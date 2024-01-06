import { Link } from "react-router-dom";
import { formatDistance } from "date-fns"; //To format date
import { FaArrowRightLong } from "react-icons/fa6";
import Comments from "./Comments";
import PropTypes from "prop-types";
import Stars from "./Stars";
import axios from "axios";

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
        {post.images[0] && (
          <div className="md:w-2/3 md:ms-6">
            <figure>
              <img
                className="rounded-md w-full max-w-[500px] mb-4 md:mb-0 md:mr-4"
                src={`http://localhost:4000/uploads/${post.images[0].slice(
                  -24
                )}`}
                alt={`Photo  from ${post.place}`}
              />
            </figure>
            
          </div>
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

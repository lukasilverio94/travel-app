
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

import Comments from "./Comments";
import Stars from "./Stars";
import { FaArrowRightLong } from "react-icons/fa6";

const Post = ({ post }) => (
  <div
    key={post._id}
    className="grid grid-cols-1 md:grid-cols-2 gap-x-4 border-b-2 py-5"
  >
    {/* Text Section */}
    <div className="flex flex-col gap-y-2 md:col-span-1 md:pr-4">
      <h3 className="text-teal-600 text-3xl">{post.title}</h3>
      <div>
        <p className="text-sm">Where: </p>
        <p className="text-slate-800 text-2xl">{post.place}</p>
      </div>

      <p>{post.description.slice(0, 50)}...</p>
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
      <Stars />
    </div>

    {/* Image Section */}
    <div className="md:col-span-1 md:ms-5 mt-3 ">
      {post.image && (
        <figure>
          <img
            className="rounded-md w-full object-cover max-w-[450px] h-auto"
            src={post.image}
            alt="Post"
          />
        </figure>
      )}
    </div>
  </div>

)
    }
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

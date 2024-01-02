import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import Comments from "./Comments";
import Stars from "./Stars";

const Post = ({ post }) => (
  <div
    key={post._id}
    className="grid grid-cols-1 md:grid-cols-2 gap-x-4 border-b-2 py-5"
  >
    {/* Text Section */}
    <div className="flex flex-col gap-y-2 md:col-span-1 md:pr-4">
      <h3 className="text-teal-600 text-3xl">{post.title}</h3>
      <div>
        <p className="text-sm">Location: </p>
        <p className="text-slate-800 text-2xl">{post.place}</p>
      </div>
      <h5 className="text-slate-900 font-semibold">Travel Experience </h5>
      <p>{post.description.slice(0, 50)}...</p>
      <small>
        {formatDistance(new Date(post.createdAt), new Date(), {
          addSuffix: true,
        })}{" "}
        by {post.writer}
      </small>
      <Comments post={post} />
      <Stars />
      <Link to={`posts/details/${post._id}`} className=" my-1">
        <span className="bg-slate-900 text-white px-2 py-2 rounded-md hover:bg-teal-500">
          Read more
        </span>
      </Link>
    </div>

    {/* Image Section */}
    <div className="md:col-span-1 md:ms-5 mt-3 ">
      {post.image && (
        <>
          <h4 className="text-slate-600 my-2">Photo: </h4>
          <img
            className="rounded-md w-full object-cover max-w-[450px] h-auto"
            src={post.image}
            alt="Post"
          />
        </>
      )}
    </div>
  </div>
);

export default Post;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "./Loader";
import Post from "./Post";
import Banner from "./Banner";
const MemoizedPost = React.memo(Post);

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const loadPosts = () => {
    setLoading(true);
    axios
      .get(`/posts?page=${currentPage}&limit=3`)
      .then((response) => {
        setPosts((prevPosts) =>
          currentPage === 1 ? response.data : [...prevPosts, ...response.data]
        );
        setHasMore(response.data.length > 0);
        setLoading(false);

        if (currentPage > 1 && containerRef.current) {
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container px-6">
      <Banner />
      <h1 className="text-4xl pt-6 pb-2 text-teal-700 font-semibold border-b-2 border-teal-700">
        Get inspired by some experiences:
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div ref={containerRef} className="container flex flex-col mt-2">
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => <MemoizedPost key={post._id} post={post} />)
          )}
        </div>
      )}

      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 p-2 bg-teal-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PostList;

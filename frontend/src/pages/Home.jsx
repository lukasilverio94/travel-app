import { useState, useEffect } from "react";
import axios from "axios";

//Component
import Loader from "../components/Loader";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/posts")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="container">
        <h1 className="text-4xl py-3 text-teal-700">
          Read all travels experiences:{" "}
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="container flex flex-col gap-y-3 mt-3">
            {posts.map((post) => (
              <div key={post._id}>
                <h3 className="text-slate-900 text-3xl py-2">{post.title}</h3>
                <p>{post.description}</p>
                <small>{post.createdAt}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

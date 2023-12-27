import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom hook for adding a post
export function useAddPost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addPost = async (postData) => {
    setLoading(true);

    try {
      await axios.post("/posts", postData);
      navigate("/");
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  return { addPost, loading };
}

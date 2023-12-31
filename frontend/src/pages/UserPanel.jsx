import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const UserPanel = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/user/search/${username}`);
        setUser(response.data.userInfo);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      // setRefresh((prevRefresh) => !prevRefresh);
    } else {
      console.warn("No file selected.");
    }
  };

  const handleUpload = async () => {
    try {
      if (!avatar) {
        console.error("Please select a file for upload.");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", avatar);
      setUploading(true);

      const response = await axios.put(
        `/user/update/${JSON.parse(localStorage.getItem("user")).userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Avatar upload successful:", response.data);

      // Update user data with the new avatar URL
      setUser((prevUser) => ({ ...prevUser, avatar: response.data.avatar }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <BackButton />
      {user.avatar ? (
        <img
          className="rounded-full w-full max-w-[150px] mb-4 md:mb-0 md:mr-4"
          src={`http://localhost:4000/uploads/${user.avatar.slice(-24)}`}
          alt={`avatar from ${user.userName}`}
        />
      ) : (
        <img
          className="rounded-full w-full max-w-[150px] mb-4 md:mb-0 md:mr-4"
          src="/assets/avatar.png"
          alt={`avatar from`}
        />
      )}

      <h1>User Details for: {username}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
          <p>Username: {user.userName}</p>

          <div className="flex flex-col">
            <h2>Upload Avatar:</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {uploading ? "Uploading..." : ""}
          </div>

          {/* "Send" button */}
          <button
            className="w-full bg-teal-500 text-white py-2 rounded"
            onClick={handleUpload}
          >
            Save
          </button>

          <h2>User Posts:</h2>
          {user.posts && user.posts.length > 0 ? (
            <ul>
              {user.posts.map((post) => (
                <li key={Math.random() * 1000000}>
                  <div className="text-teal-600 font-bold mb-2 uppercase">
                    <p>ID: {post._id}</p>
                    <p>Title: {post.title}</p>
                    <p>Description: {post.description}</p>
                    {/* Image  */}
                    <div>
                      {post.images && (
                        <img
                          src={`http://localhost:4000/uploads/${post.images[0].slice(
                            -24
                          )}`}
                        />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available for this user.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPanel;

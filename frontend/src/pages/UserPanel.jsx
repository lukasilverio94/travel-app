import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";

const UserPanel = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/user/search/${username}`);
        setUser(response.data.userInfo);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username, refresh]);
  useEffect(() => {
    console.log("Updated Avatar:", avatar);
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
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

      console.log("Avatar upload response:", response.data);
      console.log("Updated Avatar:", response.data.avatar);

      // setUser((prevUser) => ({ ...prevUser, avatar: response.data.user.avatar }));
      setUser((prevUser) => {
        console.log("Previous User:", prevUser);
        console.log("Updated Avatar URL:", response.data.user.avatar);
        return { ...prevUser, avatar: response.data.user.avatar };
      });
      setRefresh((prevRefresh) => !prevRefresh);

      console.log("Updated Avatar:", response.data.user.avatar);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full py-6 mx-auto mt-16 px-4  dark:bg-gray-950 dark:text-slate-300 leading-normal">
      <div className="max-w-2xl mx-auto p-6 shadow-md dark:shadow-sm dark:shadow-white rounded-md">
        <BackButton />

        <div className="mb-4 text-center">
          {user.avatar ? (
            <img
              key={refresh}
              className="rounded-full w-full max-w-[150px]"
              src={`http://localhost:4000/uploads/${user.avatar.slice(
                -24
              )}?t=${refresh}`}
              alt={`avatar from ${username}`}
            />
          ) : (
            <div>
              <img
                className="rounded-full w-full max-w-[150px]"
                src="/assets/avatar.png"
                alt={`default avatar`}
              />
              <p className="text-gray-500">Default Avatar</p>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold mb-4 mt-3">
          User Details for: {username}
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Username:</span> {user.userName}
            </p>

            <div className="flex flex-col mt-4">
              <h2 className="text-lg font-semibold mb-2">Upload Avatar:</h2>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {uploading && <p className="text-sm mt-2">Uploading...</p>}
            </div>

            <button
              className="w-full max-w-[200px] bg-teal-500 text-white py-2 rounded mt-2 dark:bg-gray-500"
              onClick={handleUpload}
            >
              Add/Upload Avatar
            </button>

            <h2 className="text-3xl md:text-5xl text-teal-600 font-bold mt-6 mb-4 dark:text-white">
              Your posts:
            </h2>
            {console.log(user)}
            {user.posts && user.posts.length > 0 ? (
              <ul className="text-lg flex flex-col gap-y-5">
                {user.posts.map((post) => (
                  <li
                    key={post._id}
                    className="mb-4 border-b pb-7 border-gray-300"
                  >
                    <div className="text-gray-950 dark:text-slate-300 ">
                      <p className="flex flex-col">
                        <span className="text-teal-600 dark:text-white font-semibold text-2xl">
                          Title:
                        </span>
                        {post.title}
                      </p>
                      <p className="flex flex-col">
                        <span className="text-teal-600 dark:text-white font-semibold text-2xl">
                          Location:
                        </span>
                        {post.place}
                      </p>
                      <p className="flex flex-col">
                        <span className="text-teal-600 dark:text-white font-semibold  text-2xl">
                          Description:
                        </span>
                        {post.description}
                      </p>

                      {post.images && (
                        <div>
                          <img
                            className="w-full h-full max-h-[350px] object-cover max-w-md mt-4"
                            src={`http://localhost:4000/uploads/${post.images[0].slice(
                              -24
                            )}`}
                            alt={`post image for ${post.title}`}
                          />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No posts available for this user.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;

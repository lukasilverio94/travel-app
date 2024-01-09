import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const signUpUser = (e) => {
    e.preventDefault();
    if (user.email !== "" && user.password !== "" && user.userName !== "") {
      axios
        .post("/user/new-account", user, {
          withCredentials: true,
        })
        .then((result) => {
          window.location.href = "/signIn";
        })

        .catch((err) => {
          console.error(err);
          toast.error(err.response.data);
        });
    } else {
      toast.error("All fields are required");
    }
  };

  const handleChange = (e) => {
    // Update the state when input values change
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>
      <form onSubmit={signUpUser} className="w-full max-w-md px-4">
        <label htmlFor="userName" className="block mb-1">
          * Username
        </label>
        <input
          className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
          type="text"
          id="userName"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />

        <label htmlFor="email" className="block mb-1">
          * Email
        </label>
        <input
          className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="block mb-1">
          * Password
        </label>
        <input
          className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <button
          className="w-full bg-teal-500 text-white py-2 rounded"
          type="submit"
        >
          Sign up
        </button>
      </form>

      <Link to="/signIn" className="mt-4 text-blue-500">
        <span>Have an account?</span>
        <span className="ml-1 font-bold">Sign In!</span>
      </Link>
    </div>
  );
}

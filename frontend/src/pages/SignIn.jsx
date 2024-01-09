import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogIn = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };

    if (email !== "" && password !== "") {
      axios
        .post("/user/login", data)
        .then((result) => {
          localStorage.setItem("token", result.data);
          window.location.href = "/";
          toast.success("You are logged in");
        })
        .catch((error) => {
          // Instead of setting the error state, trigger the toast notification
          toast.error(error.response.data);
        });
    } else {
      // Instead of setting the error state, trigger the toast notification
      toast.error("Email and Password are required");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen mx-6 md:w-full ">
      {/* Left column with image (to be added) */}
      <div className="md:w-1/2 p-4 hidden md:block">
        {/* image */}
        <div>
          <img src="/assets/login-photo.png" alt="Login photo" />
        </div>
      </div>

      {/* Right column with login form */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-4 ">Sign In</h2>
        <form onSubmit={submitLogIn} className="w-full max-w-md">
          <input
            className="w-full border border-gray-300 mb-4  p-2 rounded"
            type="email"
            placeholder=" * Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 mb-4  p-2  rounded"
            type="password"
            placeholder=" * Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-teal-500 text-white py-2 rounded"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <Link to="/signUp">
          <p className="mt-2 text-blue-500">
            Don't have an account yet?
            <span className="font-bold hover:underline ml-1">Sign up!</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

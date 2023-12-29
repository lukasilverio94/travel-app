import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import {useNavigate} from 'react-router-dom'

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  //  const navigate = useNavigate()

  const submitLogIn = (e) => {
    e.preventDefault();
    setErr("");
    let data = {
      email: email,
      password: password,
    };
    console.log();
    if (email !== "" && password !== "") {
      axios
        .post("/user/login", data)
        .then((result) => {
          localStorage.setItem("token", result.data);
          // navigate('allPosts')
          window.location.href = "/";
        })
        .catch((error) => {
          setErr(error.response.data.error);
        });
    } else {
      setErr("Email and Password are required");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={submitLogIn} className="w-96">
        <input
          className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 mb-4 px-3 py-2 rounded"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-teal-500 text-white py-2 rounded"
          type="submit"
        >
          Sign In
        </button>
      </form>
      {err && <h5 className="text-red-500 mt-2 font-semibold">{err}</h5>}

      <Link to="/signUp" className="mt-4 text-blue-500">
        <span>Do not have an account?</span>
        <span className="ml-1 font-bold">Sign up!</span>
      </Link>
    </div>
  );
}

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
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErr("Email and Password are required");
    }
  };
  return (
    <div>
      do you have an account sign in:
      <form onSubmit={submitLogIn}>
        <input
          className="border-2 border-gray-500 px-4 py-2  w-full resize-none"
          type="email"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-2 border-gray-500 px-4 py-2  w-full resize-none"
          type="password"
          placeholder="enter your pass"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="p-2 bg-teal-700  text-white m-8"
          type="submit"
          value="SignIn"
          onSubmit={submitLogIn}
        />
      </form>
      <h5>{err ? err : null}</h5>
      <Link to="/signUp">
        <h1>make an new account</h1>
        <h2>sign up!</h2>
      </Link>
    </div>
  );
}

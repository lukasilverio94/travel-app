import  { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


export default function SignUp() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const[err, setErr]=useState()
  const[success, setSuccess]=useState()
  const signUpUser = (e) => {
    e.preventDefault();
    if(user.email !=='' && user.password !=='' && user.userName !==''){
      axios.post('/new-account', user)
      .then((result)=>{
        setSuccess(result.data);
        window.location.href = '/signIn'
      })
      .catch((err)=>{
        // console.log(err);
        setErr(err.response.data);
      })
    }else{
      setErr('Email, Username  and Password are required')
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
    <div>
      <h2>Sign up</h2>
      <form onSubmit={signUpUser}>
        <label htmlFor="userName" className="form-label">
          Username
        </label>
        <input
        className="border-2 border-gray-500 px-4 py-2  w-full resize-none"
          type="text"
          id="userName"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />

        <hr />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
        className="border-2 border-gray-500 px-4 py-2  w-full resize-none"
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <hr />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
        className="border-2 border-gray-500 px-4 py-2  w-full resize-none"
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <button  type="submit" className="p-2 bg-teal-700  text-white m-8">
          Sign up
        </button>
      </form>
      <h5>{err ? err : null}</h5>
      <h5>{success ? success : null}</h5>



      <Link to="/signIn">
        <h1>Have an account</h1>
        <h2>Sign In!</h2>
      </Link>
      
    </div>
  );
}

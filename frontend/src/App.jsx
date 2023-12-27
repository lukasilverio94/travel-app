import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
//Components & pages
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import ShowPost from "./pages/ShowPost";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";

import Navbar from "./components/Navbar";

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

// Default axios
axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/details/:id" element={<ShowPost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/posts/delete/:id" element={<DeletePost />} />

    
        <Route exact
                    path='/signIn'
                    element={<SignIn/>}/>
        <Route exact path='/signUp'
                    element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

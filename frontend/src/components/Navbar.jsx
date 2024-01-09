import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserInfo } from "../utils/authUtil.js";
import ThemeBtn from "./ThemeBtn.jsx";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserInfo = async () => {
      const userInfo = await fetchUserInfo();
      setUsername(userInfo.username);
      setAvatar(userInfo.avatar);
      setIsLoading(false);
    };

    loadUserInfo();
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    toggleNav(false); // close  navigation menu when a link is clicked
  };
  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0 left-0 z-10 px-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="flex gap-1">
            <img src="/assets/logo.png" alt="Logo" style={{ width: "45px" }} />
            <span className="self-center text-3xl  text-teal-800  whitespace-nowrap dark:text-white">
              On the road
            </span>
          </div>
        </Link>
        {isLoggedIn && (
          <Link
            to={`/userPanel/${username}`}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="flex items-center space-x-3 self-center text-sm font-light text-green-700 whitespace-nowrap dark:text-white">
              <span className="text-sm">
                {isLoading
                  ? "Loading..."
                  : `Welcome, ${
                      username.charAt(0).toUpperCase() +
                      username.slice(1).toLowerCase()
                    }`}
              </span>

              {avatar ? (
                <img
                  className="rounded-full w-full max-w-[30px] mb-4 md:mb-0 md:mr-4"
                  src={`http://localhost:4000/uploads/${avatar.slice(-24)}`}
                  alt={`avatar from `}
                />
              ) : (
                <img
                  className="rounded-full w-full max-w-[30px] mb-4 md:mb-0 md:mr-4"
                  src={`http://localhost:4000/uploads/avatar-1704625711816.png`}
                  alt={`avatar from`}
                />
              )}
            </span>
          </Link>
        )}
        <button
          onClick={toggleNav}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isNavOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>

        <div
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/logout" onClick={handleLinkClick}>
                    <span className="text-red-800 text-sm">Logout</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="block py-2 pe-3 text-gray-700 hover:text-blue-700 rounded md:bg-transparent  md:p-0 "
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/posts/create"
                    onClick={handleLinkClick}
                    className="block py-2 pe-3 text-gray-900 rounded hover:text-blue-700  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Add Experience
                  </Link>
                </li>
                <li>
                  <Link
                    to="/locations"
                    onClick={handleLinkClick}
                    className="block py-2 pe-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Get inspired
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/userPanel/${username}`}
                    className="my-1"
                    onClick={handleLinkClick}
                  >
                    <span className="flex items-center text-teal-700">
                      <span className="hover:border-b hover:border-teal-700">
                        Profile
                      </span>
                    </span>
                  </Link>
                </li>
                <ThemeBtn />
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin" onClick={handleLinkClick}>
                    <h2>Login</h2>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

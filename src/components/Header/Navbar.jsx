import React, { useContext, useState } from "react";
import authService from "../../appwrite/auth";
import userContext from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const { loginStatus, setUserData, setLoginStatus } = useContext(userContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      setUserData(null);
      setLoginStatus(false);
      navigate("/");
    });
  };

  const [showLinks, setShowLinks] = useState(false);
  const showNavLinks = () => {
    return (
      <div>
        <div>
          <div className="bg-neutral-900 flex flex-col gap-14 absolute top-12 right-8 pt-8 mt-8 w-1/2 rounded-md">
            <Link
              to="/"
              className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
              onClick={() => setShowLinks(false)}
            >
              Home
            </Link>

            {!loginStatus ? (
              <div className="flex flex-col gap-14 pb-8">
                <Link
                  to="/signup"
                  className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
                  onClick={() => setShowLinks(false)}
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  onClick={() => setShowLinks(false)}
                  className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className=" flex gap-14">
                <Link
                  onClick={() => setShowLinks(false)}
                  to="/dashboard"
                  className=" text-white rounded-md text-lg hover:text-teal-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logoutHandler();
                    setShowLinks(false);
                  }}
                  className=" text-white rounded-md text-lg hover:text-teal-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className=" max-md:hidden  bg-transparent backdrop-blur-lg text-white flex gap-44 pb-10 pt-6 font-poppins fixed top-0 w-full ">
        <div className="flex absolute left-24">
          <Link
            to="/"
            className=" text-emerald-50 text-xl underline decoration-teal-200 underline-offset-4 "
          >
            Pomodoro
          </Link>
        </div>
        <div className="flex gap-14 absolute right-14 ">
          <Link
            to="/"
            className=" text-white rounded-md text-lg hover:text-teal-100"
          >
            Home
          </Link>

          {!loginStatus ? (
            <div className=" flex gap-14">
              <Link
                to="/signup"
                className=" text-white rounded-md text-lg hover:text-teal-100"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className=" text-white rounded-md text-lg hover:text-teal-100"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className=" flex gap-14">
              <Link
                to="/dashboard"
                className=" text-white rounded-md text-lg hover:text-teal-100"
              >
                Dashboard
              </Link>
              <button
                className=" text-white rounded-md text-lg hover:text-teal-100"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className=" hidden max-sm:flex">
        <div className=" bg-transparent backdrop-blur-lg text-white flex gap-44 pb-10 pt-6 font-poppins fixed top-0 w-full ">
          <div className="flex ml-10">
            <Link
              to="/"
              className=" text-emerald-50 text-xl underline decoration-teal-200 underline-offset-4 ml-2"
            >
              Pomodoro
            </Link>
            {showLinks ? (
              <div className=" absolute right-10 top-6">
                <button
                  onClick={() => setShowLinks(!showLinks)}
                >
                  <ion-icon name="close"></ion-icon>
                </button>
              </div>
            ) : (
              <div className=" absolute right-10 top-6">
                <button
                  onClick={() => setShowLinks(!showLinks)}
                >
                  <ion-icon name="reorder-three-outline"></ion-icon>
                </button>
              </div>
            )}
          </div>
          <div>{showLinks ? showNavLinks() : ""}</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

import React, { useContext } from "react";
import authService from "../../appwrite/auth";
import userContext from "../../context/userContext";
import { Link } from "react-router-dom";
function Navbar() {
  const { loginStatus, setUserData, setLoginStatus } = useContext(userContext);

  const logoutHandler = () => {
    authService.logout().then(() => {
      setUserData(null);
      setLoginStatus(false);
    });
  };
  return (
    <>
      <div className=" bg-transparent  backdrop-blur-md text-white flex gap-44 pb-10 pt-6 font-poppins fixed top-0 w-full ">
        <div className="flex absolute left-24">
          <Link to="/" className=" text-emerald-50 text-xl underline decoration-teal-200 underline-offset-4 ">
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
    </>
  );
}

export default Navbar;

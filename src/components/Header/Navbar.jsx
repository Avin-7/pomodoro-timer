import React, { useContext, useState } from "react";
import authService from "../../appwrite/auth";
import userContext from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const {
    loginStatus,
    setUserData,
    setLoginStatus,
    setTimerRunning,
    timerRunning,
  } = useContext(userContext);
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
    if (timerRunning) {
      return (
        <div>
          <div>
            <div className="bg-neutral-900 flex flex-col gap-14 absolute top-12 right-8 pt-8 mt-8 w-1/2 rounded-md">
              <Link
                className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
                onClick={() => {
                  setShowLinks(false);
                  handleExit();
                }}
              >
                Home
              </Link>
              <Link
                onClick={() => {
                  setShowLinks(false);
                  handleExit();
                }}
                className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => {
                  setShowLinks(false);
                  handleExit();
                }}
                className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
              >
                Todos
              </Link>

              {!loginStatus ? (
                <div className="flex flex-col gap-14 pb-8">
                  <Link
                    className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
                    onClick={() => {
                      setShowLinks(false);
                      handleExit();
                    }}
                  >
                    Signup
                  </Link>
                  <Link
                    onClick={() => {
                      setShowLinks(false);
                      handleExit();
                    }}
                    className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className=" flex flex-col pb-8 gap-14">
                  <button
                    onClick={() => {
                      logoutHandler();
                      setShowLinks(false);
                    }}
                    className=" bg-white text-black px-4 py-1 rounded-md text-lg hover:bg-teal-100 text-start pl-6"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <div>
            <div className="bg-neutral-900 flex flex-col gap-14 absolute top-12 right-8 pt-8 mt-8 w-1/2 rounded-md">
              <Link
                to="/"
                className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
                onClick={() => setShowLinks(false)}
              >
                Home
              </Link>
              <Link
                onClick={() => setShowLinks(false)}
                to="/dashboard"
                className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => setShowLinks(false)}
                to="/todos"
                className=" text-white rounded-md text-lg hover:text-teal-100 pl-6"
              >
                Todos
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
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className=" flex flex-col pb-8 gap-14">
                  <button
                    onClick={() => {
                      logoutHandler();
                      setShowLinks(false);
                    }}
                    className="  bg-white max-md:bg-transparent max-md:text-white max-md:hover:text-teal-100 text-black px-4 py-1 rounded-md text-lg hover:bg-teal-100 text-start pl-6"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  };
  const handleExit = () => {
    var confirmation = confirm("Do you want to close timer?");
    if (confirmation) {
      setTimerRunning(false);
    } else {
      setTimerRunning(true);
    }
  };

  return (
    <>
      <div className="  max-lg:hidden bg-transparent backdrop-blur-lg text-white flex gap-44 pb-10 pt-6 font-poppins fixed top-0 w-full z-50">
        {timerRunning ? (
          <>
            <div className="flex absolute left-24 nav-bar">
              <Link
                // to="/"
                className=" text-emerald-50 text-xl underline decoration-teal-200 underline-offset-4 tracking-wider outline-none"
              >
                Foczy
              </Link>
            </div>
            <div className="flex gap-14 max-lg:gap-9 absolute right-14 ">
              <Link
                className=" text-white rounded-md text-lg hover:text-teal-100"
                onClick={() => {
                  handleExit();
                }}
              >
                Home
              </Link>
              <Link
                className=" text-white rounded-md text-lg hover:text-teal-100"
                onClick={() => {
                  handleExit();
                }}
              >
                Dashboard
              </Link>
              <Link
                className=" text-white rounded-md text-lg hover:text-teal-100"
                onClick={() => {
                  handleExit();
                }}
              >
                Todos
              </Link>

              {!loginStatus ? (
                <div className=" flex gap-14 max-lg:gap-9">
                  <Link
                    className=" text-white rounded-md text-lg hover:text-teal-100"
                    onClick={() => {
                      handleExit();
                    }}
                  >
                    Signup
                  </Link>
                  <Link
                    className=" text-white rounded-md text-lg hover:text-teal-100"
                    onClick={() => {
                      handleExit();
                    }}
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className=" flex gap-14">
                  <button
                    className=" bg-white text-black px-4 py-1 rounded-md text-lg hover:bg-teal-100"
                    onClick={logoutHandler}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="  flex absolute left-24 nav-bar">
              <Link
                to="/"
                className=" text-emerald-50 text-xl underline decoration-teal-200 outline-none underline-offset-4 "
              >
                Foczy
              </Link>
            </div>
            <div className="flex gap-14 max-lg:gap-9 absolute right-14 ">
              <Link
                to="/"
                className=" text-white rounded-md text-lg hover:text-teal-100"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className=" text-white rounded-md text-lg hover:text-teal-100"
              >
                Dashboard
              </Link>
              <Link
                to="/todos"
                className=" text-white rounded-md text-lg hover:text-teal-100"
              >
                Todos
              </Link>

              {!loginStatus ? (
                <div className=" flex gap-14 max-lg:gap-9">
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
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className=" flex gap-14">
                  <button
                    className=" bg-white text-black px-4 py-1 rounded-md text-lg hover:bg-teal-100"
                    onClick={logoutHandler}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="  hidden max-lg:flex ">
        <div className=" bg-transparent backdrop-blur-lg text-white flex gap-44 pb-10 pt-6 font-poppins fixed top-0 w-full z-50">
          {timerRunning ? (
            <>
              <div className="flex ml-10">
                <Link
                  className=" text-emerald-50 text-xl underline decoration-teal-200 underline-offset-4 ml-2 outline-none"
                  onClick={() => {
                    handleExit();
                  }}
                >
                  Foczy
                </Link>
                {showLinks ? (
                  <div className=" absolute right-10 top- 6">
                    <button onClick={() => setShowLinks(!showLinks)}>
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </div>
                ) : (
                  <div className=" absolute right-10 top-6">
                    <button onClick={() => setShowLinks(!showLinks)}>
                      <ion-icon name="reorder-three-outline"></ion-icon>
                    </button>
                  </div>
                )}
              </div>
              <div>{showLinks ? showNavLinks() : ""}</div>
            </>
          ) : (
            <>
              <div className="flex ml-10">
                <Link
                  to="/"
                  className=" text-emerald-50 text-xl underline decoration-teal-200 underline-offset-4 ml-2 outline-none"
                >
                  Foczy
                </Link>
                {showLinks ? (
                  <div className=" absolute right-10 top-6">
                    <button onClick={() => setShowLinks(!showLinks)}>
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </div>
                ) : (
                  <div className=" absolute right-10 top-6">
                    <button onClick={() => setShowLinks(!showLinks)}>
                      <ion-icon name="reorder-three-outline"></ion-icon>
                    </button>
                  </div>
                )}
              </div>
              <div>{showLinks ? showNavLinks() : ""}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

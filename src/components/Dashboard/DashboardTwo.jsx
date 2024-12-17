import React, { useState } from "react";
import Profile from "./Profile";
import Dashboard from "./Dashboard";

function DashboardTwo() {
  const [dispalyProfile, setDisplayProfile] = useState(true);
  const [displayDashboard, setDisplayDashboard] = useState(false);
  
  const handleClick = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    switch (value) {
      case "dashboard":
        setDisplayDashboard((prev) => !prev);
        break;

      default:
        setDisplayProfile(true);
        break;
    }
  };

  const displayComponents = () => {
    if (displayDashboard) {
      return displayDashboardeFunction();
    } else if (dispalyProfile) {
      return displayProfileFunction();
    }
  };

  const displayProfileFunction = () => {
    return (
      <div>
        <Profile />
      </div>
    );
  };

  const displayDashboardeFunction = () => {
    return (
      <div>
        {console.log("truee here at 41")}
        <Dashboard />
      </div>
    );
  };
  return (
    <div className="w-[98%] min-h-[500px] text-white flex justify-center align-middle gap-4 mt-32">
      <div className=" w-2/5  ml-4 pl-8 pt-10 h-96 rounded-xl bg-zinc-900 ">
        <h1 className=" text-3xl pl-2">Welcome, username</h1>
        <div className="w-full mt-10 flex flex-col gap-4 justify-self-start text-gray-200 ">
          <button
            onClick={(e) => {
              handleClick(e);
            }}
            value="profile"
            className=" text-left w-11/12 py-4 pl-4 hover:bg-zinc-800 rounded-md transition-all ease-linear "
          >
            Profile
          </button>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
            value="dashboard"
            className=" text-left w-11/12 py-4 pl-4 hover:bg-zinc-800 rounded-md transition-all ease-linear"
          >
            Dashboard
          </button>
        </div>
      </div>
      <div className=" w-3/5 pl-12 pt-4 rounded-xl  bg-zinc-900">
        <div className=" w-full">{displayComponents()}</div>
      </div>
    </div>
  );
}

export default DashboardTwo;

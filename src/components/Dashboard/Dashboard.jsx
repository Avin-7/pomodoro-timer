import React, { useState, useContext, useEffect } from "react";
import Profile from "./Profile";
import Usage from "./Usage";
import userContext from "../../context/userContext";

import { MdOutlineInsertChart, MdOutlineAccountCircle } from "react-icons/md";

import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

function Dashboard() {
  const { userData } = useContext(userContext);

  const [showProfilecomponent, setShowProfilecomponent] = useState(true);
  const [showUsagecomponent, setShowUsagecomponent] = useState(false);

  const [showLinks, setShowLinks] = useState(false);

  const displayComponents = () => {
    if (showProfilecomponent) {
      return (
        <div className=" ">
          <Profile />
        </div>
      );
    } else if (showUsagecomponent) {
      return (
        <div className=" ">
          <Usage />
        </div>
      );
    }
  };


  return (
    <>
  
      <div id="dashboard-links" className="flex justify-center items-center">
        <div className=" flex justify-center items-center gap-[520px] max-xl:gap-96 max-lg:gap-60 mt-36 py-6 rounded-t-xl  text-white w-4/5 bg-neutral-900">
          <h1 className="text-xl max-md:hidden">Welcome, {userData.name}</h1>
          <div className="flex gap-10 ">
            <button
              onClick={(e) => {
                setShowUsagecomponent(false);
                setShowProfilecomponent(true);
              }}
              value="profile"
              className=" flex"
            >
              <MdOutlineAccountCircle className=" text-xl mr-1 pt-0.5" />{" "}
              <span className=" ">Profile</span>
            </button>
            <button
              onClick={(e) => {
                setShowProfilecomponent(false);
                setShowUsagecomponent(true);
              }}
              value="dashboard"
              className=" flex"
            >
              <MdOutlineInsertChart className="text-xl mr-1 pt-0.5" />{" "}
              <span className="">Usage</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center  ">
        <div className=" mb-6 w-4/5 p-6 rounded-b-xl bg-neutral-900 ">
          <div className=" ">{displayComponents()}</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

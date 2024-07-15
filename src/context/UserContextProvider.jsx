import React from "react";
import userContext from "./userContext";
import { useState } from "react";

const getDate = () => {
  const d = new Date();
  const date = d.getDate();
  const month = d.getMonth() + 1; //january gives 0
  const year = d.getFullYear();
  const currDate = date + "-" + month + "-" + year;
  return currDate;
};

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [date, setDate] = useState(getDate());
  const [usageTime, setUsageTime] = useState(0);
  const context = {
    userData,
    setUserData,
    loginStatus,
    setLoginStatus,
    date,
    setDate,
    usageTime,
    setUsageTime,
  };
  console.log(userData.name);
  return (
    <userContext.Provider value={context}>{children}</userContext.Provider>
  );
};

export default UserContextProvider;

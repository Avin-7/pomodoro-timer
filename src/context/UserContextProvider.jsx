import React, { useEffect } from "react";
import userContext from "./userContext";
import { useState } from "react";
import authService from "../appwrite/auth";
import service from "../appwrite/config";
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
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(getDate());
  const [usageTime, setUsageTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const context = {
    userData,
    setUserData,
    loginStatus,
    setLoginStatus,
    email,
    setEmail,
    date,
    setDate,
    usageTime,
    setUsageTime,
    timerRunning,
    setTimerRunning,
  };

  async function getUser() {
    try {
      const data = await authService.getCurrentUser();
      if (data.status) {
        setLoginStatus(true);
        setUserData(data);
        setEmail(data.email);
        const res = await service.getDataOfDate({ date, email });
        if (!res) {
          await service.storeData({ date, usageTime, email });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, [loginStatus]);
  return (
    <userContext.Provider value={context}>{children}</userContext.Provider>
  );
};

export default UserContextProvider;

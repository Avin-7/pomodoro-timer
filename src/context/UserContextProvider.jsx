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
  const [userEmail, setUserEmail] = useState("");
  const [date, setDate] = useState(getDate());
  const [usageTime, setUsageTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const context = {
    userData,
    setUserData,
    loginStatus,
    setLoginStatus,
    userEmail,
    setUserEmail,
    date,
    setDate,
    usageTime,
    setUsageTime,
    timerRunning,
    setTimerRunning,
  };

  async function getUser() {
    try {
      if (loginStatus == false) {
        const data = await authService.getCurrentUser();
        if (data.status) {
          setLoginStatus(true);
          setUserData(data);
          setUserEmail(data.email);
          const res = await service.getDataOfDate({ date, userEmail });
          if (!res) {
            await service.storeData({ date, usageTime, userEmail });
          }
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

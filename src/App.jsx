import React from "react";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import UserContextProvider from "./context/UserContextProvider";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Outlet />
      </UserContextProvider>
    </>
  );
}

export default App;

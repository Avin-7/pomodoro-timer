import React from "react";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import UserContextProvider from "./context/UserContextProvider";
import { Outlet } from "react-router-dom";
import TodoContextProvider from "./context/TodoContextProvider";

function App() {
  return (
    <>
      <UserContextProvider>
        <TodoContextProvider>
          <Navbar />
          <Outlet />
        </TodoContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;

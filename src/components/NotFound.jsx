import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className=" text-white text-xl flex flex-col justify-center items-center mt-60">
      <h1 className="text-center text-6xl font-bold">404</h1>
      <h1 className="text-center">Page not found</h1>
      <Link to={"/"} className=" px-4 py-3 bg-white rounded-md text-black m-8">
        Go to home
      </Link>
    </div>
  );
}

export default NotFound;

import React from "react";
function Home() {
  return (
    <>
      <div className="py-72 max-md:py-52 font-raleway font-medium bg-black flex justify-center align-middle text-white">
        <div className="max-md:px-0 px-32 text-center flex flex-col gap-10">
          <h1 className="max-md:text-5xl max-md:px-4 text-6xl">
            Enhance Your <span className="bg-clip-text text-transparent  bg-gradient-to-r from-green-300 via-green-700 to-teal-400"> Productivity </span>
            with Foczy.
          </h1>
          <p className="max-md:px-10 max-md:text-md text-balance text-gray-400 ">
            Harness the power of focused work sessions with Foczy.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;

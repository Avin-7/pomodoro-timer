import React from "react";

function Home() {
  return (
    <>
      <div className="py-52 font-poppins bg-black flex justify-center align-middle text-white">
        <div className="max-md:px-0 px-32 text-center flex flex-col gap-10">
          <h1 className="max-md:text-5xl max-md:px-4 text-7xl">
            Enhance Your <span className=" text-teal-100"> Productivity </span>
            with Pomodoro.
          </h1>
          <p className="max-md:px-16 max-md:text-md px-20 text-gray-400 ">
            Harness the power of focused work sessions with our Pomodoro
            platform. Track progress, manage time efficiently, and achieve more
            with less stress. Start improving your productivity today!
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;

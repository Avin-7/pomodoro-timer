import React from "react";

function Home() {
  return (
    <>
      <div className="py-52 font-poppins bg-black flex justify-center align-middle text-white">
        <div className="px-32 text-center flex flex-col gap-10">
          <h1 className=" text-7xl">
            Enhance Your <span className=" text-teal-100"> Productivity </span>with Pomodoro.
          </h1>
          <p className=" px-20 text-gray-400 ">
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

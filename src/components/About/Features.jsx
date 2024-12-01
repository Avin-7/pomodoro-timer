import React from "react";
import iphoneMockup from "../../assets/iphoneMockup.png";
function Features() {
  return (
    <>
      <div className=" text-white mt-40 mb-24">
        <div className=" w-full flex max-md:flex-col p-28 max-xl:p-14 max-lg:p-8 mt-20">
          <div className="w-2/4 max-md:w-full max-lg:w-3/5 pl-20 max-md:pl-4 mt-16 flex justify-center items-start">
            <h2 className=" text-5xl max-md:text-3xl max-md:text-pretty max-md:mb-16 break-words leading-snug font-medium font-raleway">
              Choose from various time intervals to suit your needs.
            </h2>
          </div>
          <div className=" w-2/4 max-lg:w-2/5 max-md:w-full flex justify-center items-center rounded-lg relative">
            <div className=" blur-3xl bg-emerald-950 w-96 max-md:w-60 h-72 absolute -z-50 ">
              Lorem ipsum
            </div>
            <img
              src={iphoneMockup}
              className="-z-10 object-cover h-[490px] max-md:h-96"
              alt=""
            />
          </div>
        </div>
        {/* <ul>
        <li>Choose from various time intervals to suit your needs.</li>
        <li>
          To-Do List: Organize and track your daily tasks easily with to-do
          list.
        </li>
        <li>Clean, distraction-free interface for better focus.</li>
        <li> View completed tasks and track your progress.</li>
        <li>Access Foczy anytime, anywhere, on any device.</li>
        <li>Enjoy all features without any cost.</li>
      </ul> */}
      </div>
    </>
  );
}

export default Features;

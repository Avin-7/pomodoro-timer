import React from "react";
import personSitting from "../../assets/personSitting.jpg";
import rightArrow from "../../assets/rightArrow.svg";
import timer from "../../assets/timer.svg";
function HowToUse() {
  return (
    <>
      <div className=" text-white mt-40">
        <h1 className=" text-4xl max-md:text-2xl text-center font-raleway underline underline-offset-8 my-20 decoration-emerald-700 tracking-wider ">
          How to use the timer?
        </h1>
        <div className=" w-full flex gap-4 max-lg:gap-0.5 max-md:flex-col p-28 max-xl:p-14 max-lg:p-8">
          <div className=" w-2/4 max-md:w-full flex justify-center items-center">
            <img
              src={personSitting}
              alt=""
              className=" w-3/4 max-md:w-full h-[450px] max-md:h-64 object-cover rounded-lg"
            />
          </div>
          <div className=" w-2/4 max-md:w-full bg-transparent font-poppins">
            <ul className=" my-10">
              <li className="mb-14 max-xl:mb-8 text-lg">
                <img
                  src={rightArrow}
                  className="size-6 inline-block mr-2"
                  alt=""
                />
                Set a Timer: For example,{" "}
                <span className=" text-emerald-400">Work</span> for 25 minutes
                which is one pomodoro.
              </li>

              <li className="mb-14 max-xl:mb-8 text-lg">
                <img
                  src={rightArrow}
                  className="size-6 inline-block mr-2"
                  alt=""
                />
                Take a Short Break:{" "}
                <span className=" text-emerald-400">Rest</span> for 5 minutes
                after each Pomodoro.
              </li>

              <li className="mb-14 max-xl:mb-8 text-lg">
                <img
                  src={rightArrow}
                  className="size-6 inline-block mr-2"
                  alt=""
                />
                Repeat:{" "}
                <span className=" text-emerald-400">Do 4 Pomodoros</span>, then
                take a longer break for 15-30 minutes.
              </li>

              <li className="mb-14 max-xl:mb-8 text-lg">
                <img
                  src={rightArrow}
                  className="size-6 inline-block mr-2"
                  alt=""
                />
                Stay Focused:{" "}
                <span className=" text-emerald-400">Use the intervals</span> to
                maintain high productivity.
              </li>
              <li className=" mt-16 max-xl:mt-8">
                <a
                  href="#timer"
                  className=" px-4 py-3 bg-white text-black rounded-lg font-normal font-poppins tracking-wide"
                >
                  <span>
                    <img
                      src={timer}
                      className=" inline-block size-4 mr-2 mb-0.5"
                      alt=""
                    />
                  </span>
                  Start focusing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowToUse;

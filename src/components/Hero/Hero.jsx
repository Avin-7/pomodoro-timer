import React, { useContext, useState } from "react";
import userContext from "../../context/userContext";
import service from "../../appwrite/config";
import Home from "./Home";
import Footer from "../Footer/Footer";
import { Modal, ConfigProvider } from "antd";
function Hero() {
  const [sec, setSec] = useState(60);
  const [time, setTime] = useState(0);
  const [min, setMin] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [custom, setCustom] = useState("");
  const [cutomTimerInput, setCustomTimerInput] = useState(false);
  var intId = 0;
  const [intervalId, setIntervalId] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    loginStatus,
    date,
    userData,
    setTimerRunning,
    timerRunning,
    usageTime,
    setUsageTime,
  } = useContext(userContext);
  const email = userData != null ? userData.email : null;

  let seconds = 60;
  var totalMinutes = 0;

  const handleStart = (e) => {
    if (time != 0) {
      setTimerStart(true);
      totalMinutes = time;
      intId = setInterval(updateTime, 1000);
      setIntervalId(intId);
      setCustomTimerInput(false);
      setTimerRunning(true);
    } else {
      alert("Please Select the duration of timer.");
    }
  };

  function updateTime() {
    seconds--;
    setSec(seconds);
    setMin(totalMinutes);
    if (seconds == 0) {
      if (seconds == 0 && totalMinutes == 0) {
        setTimerCompleted(true);
        handleStop();
        updateTimeUsage(time + 1);
      }
      seconds = 60;
      totalMinutes = totalMinutes - 1;
    }
  }

  function handleStop() {
    clearInterval(intervalId);
    seconds = 60;
    setTimerStart(false);
    setTime(0);
    setMin(0);
    setSec(60);
    setCustom(0);
    setCustomTimerInput(false);
    setIsModalOpen(false);
    setTimerRunning(false);
  }

  const hideMessage = () => {
    setTimerCompleted(false);
    setTimerStart(false);
  };

  const timer = () => {
    if (timerCompleted) {
      clearInterval(intervalId);
      return (
        <div className="outline rounded-lg flex justify-center align-middle z-10">
          <div className=" bg-zinc-950 ">
            <h1 className=" bg-zinc-900 text-white px-20 py-4">
              Hurray, you have completed 🎉
            </h1>
            <h1 className=" text-white py-6 px-5 mb-2">Take a break.</h1>
            <button
              onClick={(e) => hideMessage()}
              className="bg-zinc-700 rounded-full px-5 py-2 m-2 text-white "
            >
              Okay
            </button>
          </div>
        </div>
      );
    } else if (timerStart) {
      if (timerRunning == false) {
        handleStop();
      }
      return (
        <h1 className="text-9xl max-md:text-8xl">
          {min < 10 ? "0" + min : min} : {sec < 10 ? "0" + sec : sec}
        </h1>
      );
    } else {
      if (time != 0 && timerStart == false) {
        return (
          <h1 className="text-9xl max-md:text-8xl">
            {`${time + 1}` < 10 ? `0${time + 1}` : `${time + 1}`} : 00
          </h1>
        );
      }
      return <h1 className="  text-9xl max-md:text-8xl">00:00</h1>;
    }
  };

  async function getData() {
    const res = await service.getDataOfDate({ date, email });
    return res;
  }

  const updateTimeUsage = async (time) => {
    const data = await getData();
    if (data != null) {
      const currentData = data.documents[0];
      const newTime = data.documents[0].TotalTime + time;
      await service.updateDocument(currentData.$id, newTime);
      console.log("updated sucessfully");
    } else {
      const res = await service.storeData({ date, usageTime, email });
      if (res) {
        const newTime = time;
        await service.updateDocument(userData.$id, newTime);
      }
      console.log("new data is stored");
    }
  };

  return (
    <>
      <Home />
      <div
        className=" bg-neutral-950 text-white font-poppins pb-96 pt-96"
        id="timer"
      >
        <h1 className="underline underline-offset-8  decoration-teal-200 text-center text-4xl pt-6 text-neutral-100 ">
          Let&apos;s Focus
        </h1>
        <div className=" flex-wrap flex justify-center align-middle gap-4 px-4 pt-20 pb-12">
          <button
            onClick={(e) => {
              setTime(Number(e.target.value) - 1);
              setMin(Number(e.target.value) - 1);
            }}
            id="2"
            value="2"
            className=" bg-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900  "
          >
            2 min
          </button>
          <button
            onClick={(e) => {
              setTime(Number(e.target.value) - 1);
              setMin(Number(e.target.value) - 1);
            }}
            id="10"
            value="10"
            className=" bg-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900  "
          >
            10 min
          </button>
          <button
            onClick={(e) => {
              setTime(Number(e.target.value) - 1);
              setMin(Number(e.target.value) - 1);
            }}
            id="15"
            value="15"
            className=" bg-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900  "
          >
            15 min
          </button>
          <button
            onClick={(e) => {
              setTime(Number(e.target.value) - 1);
              setMin(Number(e.target.value) - 1);
            }}
            id="25"
            value="25"
            className=" bg-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900  "
          >
            25 min
          </button>
          <button
            onClick={(e) => {
              setTime(Number(e.target.value) - 1);
              setMin(Number(e.target.value) - 1);
            }}
            id="45"
            value="45"
            className=" bg-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900  "
          >
            45 min
          </button>
          <button
            onClick={(e) => {
              setTime(Number(e.target.value) - 1);
              setMin(Number(e.target.value) - 1);
            }}
            id="90"
            value="90"
            className=" bg-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900  "
          >
            90 min
          </button>
          <div>
            <button
              onClick={(e) => setCustomTimerInput(!cutomTimerInput)}
              className="bg-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900  "
            >
              Custom
            </button>
            {cutomTimerInput ? (
              <input
                type="text"
                placeholder="Enter minutes"
                className=" w-36 pl-4 py-2 outline-none bg-transparent text-white border rounded-3xl ml-1"
                value={custom}
                onChange={(e) => {
                  setTime(Number(e.target.value) - 1);
                  setCustom(Number(e.target.value));
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className=" flex justify-center align-middle pt-20 pb-12 max-md:pt-14 max-md:pb-6">
          {timer()}
        </div>
        <div className=" flex justify-center align-middle pb-20 pt-28">
          {isModalOpen ? (
            <>
              <ConfigProvider
                theme={{
                  components: {
                    Modal: {
                      contentBg: "#FFFFFF40",
                    },
                  },
                }}
              >
                ...
                <Modal
                  title=""
                  open={isModalOpen}
                  onOk={handleStop}
                  onCancel={handleCancel}
                  contentBg="#212121"
                  footerBg="#000"
                  okText={"Yes"}
                  cancelText={"No"}
                >
                  <h1 className=" text-white text-lg">
                    Do you want to give up ?
                  </h1>
                </Modal>
              </ConfigProvider>
            </>
          ) : (
            ""
          )}
          {timerStart ? (
            <button
              onClick={(e) => {
                showModal();
              }}
              className="text-black bg-white font-bold uppercase text-lg border rounded-full px-10 py-3 hover:bg-transparent hover:text-white ease-in-out  "
            >
              Stop
            </button>
          ) : (
            <button
              onClick={(e) => handleStart(e)}
              className="text-black bg-white tracking-wider font-bold text-lg border rounded-full px-10 py-3 hover:bg-transparent hover:text-white ease-in-out  "
            >
              Let&apos;s begin
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Hero;

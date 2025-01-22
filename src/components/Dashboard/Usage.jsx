import React, { useContext, useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import service from "../../appwrite/config";
import userContext from "../../context/userContext";
import { Link } from "react-router-dom";
function Usage() {
  const { userData, loginStatus } = useContext(userContext);
  const [data, setData] = useState();
  var options = {
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    maintainAspectRatio: true,
  };

  defaults.responsive = true;

  const getData = async () => {
    try {
      const res = await service.getDataOfEmail(userData.email);
      if (res) {
        setData(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [loginStatus]);

  const getLabels = () => {
    var arr = [];
    if (data != undefined) {
      data.documents.map((i) => {
        if (i.TotalTime > 0) arr.push(i.Date);
      });
      return arr;
    }
  };
  const getTimeUsage = () => {
    var arr = [];
    if (data != undefined) {
      data.documents.map((i) => {
        if (i.TotalTime > 0) arr.push(i.TotalTime);
      });
      return arr;
    }
  };

  return loginStatus ? (
    <>
      <div className="p-8 max-md:p-0 ">
        <div className="">
          <div className="">
            <Bar
              data={{
                labels: getLabels(),
                datasets: [
                  {
                    label: "Time used in minutes",
                    data: getTimeUsage(),
                    backgroundColor: ["rgb(100,210,142)"],
                    borderRadius: 10,
                    barThickness: 50,
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className=" flex flex-col justify-center items-center mt-60 text-white text-xl">
      <h1 className=" text-balance mx-20 ">
        Please
        <Link
          to="/login"
          className=" text-blue-500 underline underline-offset-2 rounded-md  mx-2 hover:text-blue-400"
        >
          Login
        </Link>
        or{" "}
        <Link
          to="/signup"
          className=" text-blue-500 underline underline-offset-2 rounded-md mx-2 hover:text-blue-400"
        >
          Create a new account
        </Link>{" "}
        to view Dashboard
      </h1>
    </div>
  );
}

export default Usage;

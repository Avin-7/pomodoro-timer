import React, { useContext, useEffect, useState } from "react";
import Chart, { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import service from "../../appwrite/config";
import userContext from "../../context/userContext";
function Dashboard() {
  // defaults.maintainAspectRatio = false;

  const { userData } = useContext(userContext);
  const [data, setData] = useState();
  var options = {
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
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
  });
  const getLabels = () => {
    var arr = [];
    if (data != undefined) {
      data.documents.map((i) => arr.push(i.Date));
      return arr;
    }
  };
  const getTimeUsage = () => {
    var arr = [];
    if (data != undefined) {
      data.documents.map((i) => arr.push(i.TotalTime));
      return arr;
    }
  };

  return (
    <>
      <div className=" bg-neutral-900  flex gap-10 py-20 pl-10 font-poppins max-md:block pb-18 max-sm:pl-0 ">
        <div className="py-20 w-1/3 bg-neutral-950 rounded-lg h-full max-lg:w-1/4 max-lg:py-4 max-md:w-11/12 max-md:pr-2 max-md:h-1/2 max-md:mt-4 max-sm:mx-4 ">
          <div className="my-8 rounded-full flex justify-center align-middle ">
            <img
              src="src\assets\dummy-profile-pic-300x300-1.png"
              alt="image here"
              className=" w-52 max-lg:w-32 object-scale-down rounded-full"
            />
          </div>
          <h2 className=" ml-8 my-2 text-white max-lg:text-sm">
            username : {userData.name}
          </h2>
          <h2 className=" ml-8 mb-8 text-white max-lg:text-sm">
            Email : {userData.email}
          </h2>
        </div>
        <div className=" bg-neutral-950 text-white rounded-lg w-3/5 max-md:w-11/12 max-md:h-96 max-sm:h-96 max-sm:w-11/12 max-sm:mx-4 ">
          <h1 className="  text-xl p-1 mt-2 ml-2 pb-14 ">Usage</h1>
          <div className=" w-full h-full">
            <Bar
              data={{
                labels: getLabels(),
                datasets: [
                  {
                    label: "Time used in minutes",
                    data: getTimeUsage(),
                    backgroundColor: ["rgb(198,123,230)"],
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
  );
}

export default Dashboard;

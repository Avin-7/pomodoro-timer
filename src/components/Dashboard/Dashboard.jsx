import React, { useContext, useEffect, useState } from "react";
import Chart, { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import service from "../../appwrite/config";
import userContext from "../../context/userContext";
function Dashboard() {
  // defaults.maintainAspectRatio = false;

  const { userData, loginStatus } = useContext(userContext);
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

  return loginStatus ? (
    <>
      <div className=" bg-neutral-900  flex gap-10 py-20 pl-10 font-poppins max-md:block pb-18 max-sm:pl-0 ">
        <div className="py-20 w-1/3 bg-neutral-950 rounded-lg h-full max-lg:w-1/4 max-lg:py-4 max-md:w-11/12 max-md:pr-2 max-md:h-1/2 max-md:mt-4 max-sm:mx-4 ">
          <div className="my-8 rounded-full flex justify-center align-middle ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon w-52 max-lg:w-32 object-scale-down rounded-full bg-white"
              viewBox="0 0 512 512"
            >
              <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z" />
            </svg>
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
  ) : (
    <div className=" flex justify-center align-middle">
      <div>
        <h1 className=" text-2xl text-white text-center pt-48 break-words">
          Please Signup or Login to view Dashboard...
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;

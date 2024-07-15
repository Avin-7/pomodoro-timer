import React, { useContext, useEffect, useState } from "react";
import Chart, { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import service from "../../appwrite/config";
import userContext from "../../context/userContext";
function Dashboard() {
  // defaults.maintainAspectRatio = false;
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
          display: false,
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

  const { userData } = useContext(userContext);
  const [uname, setUname] = useState(userData.name);
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const res = await service.getDataOfUsername({ uname });
      // console.log(res.documents.map((i) => console.log(i.Date)));
      if (res) {
        setData(res);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
      <div className="bg-black flex gap-10 py-20 pl-10 font-poppins">
        <div className="py-10 w-1/3 bg-neutral-950 h-full">
          <div className="my-4 rounded-full flex justify-center align-middle">
            <img
              src="src\assets\dummy-profile-pic-300x300-1.png"
              alt="image here"
              className=" w-52 object-scale-down rounded-full "
            />
          </div>
          <h2 className=" ml-8 text-white ">Username here</h2>
          <h2 className=" ml-8 text-white ">Email here</h2>
        </div>
        <div className=" w-3/5 bg-white text-white">
          <div className=" p-5">
            <Bar
              data={{
                labels: getLabels(),
                datasets: [
                  {
                    label: "Time",
                    data: getTimeUsage(),
                    backgroundColor: [
                      "rgb(198,123,230)",
                      "rgb(198,123,170)",
                      "rgb(200,189,220)",
                    ],
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

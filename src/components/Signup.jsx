import React, { useContext, useState } from "react";
import authService from "../appwrite/auth";
import userContext from "../context/userContext";
import service from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserData, setLoginStatus, date, usageTime } =
    useContext(userContext);
  const navigate = useNavigate();
  const create = async () => {
    try {
      const userData = await authService.createAccount({
        email,
        password,
        uname,
      });
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUserData(userData);
          setLoginStatus(true);
        }
      }
      const data = await service.getDataOfDate({ date, email });
      if (!data) {
        await service.storeData({ date, usageTime, email });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPassword = () => {
    const ele = document.getElementById("pass");
    if (ele.type == "password") {
      ele.type = "text";
    } else {
      ele.type = "password";
    }
  };

  return (
    <>
      <div className="bg-neutral-950 font-poppins pb-64">
        <div>
          <h1 className=" text-white flex justify-center align-middle pt-36 pb-4 text-3xl">
            Sign Up
          </h1>
        </div>
        <div className="pt-30 flex justify-center align-middle">
          <form
            action=" "
            className="p-2 pb-14 pt-2 flex-col flex w-1/4 max-lg:w-1/3 max-md:w-11/12 max-sm:w-3/4 max-[320px]:w-4/5"
            onSubmit={(e) => {
              e.preventDefault();
              create();
            }}
          >
            <input
              className=" border rounded-md bg-transparent text-white px-3 py-2 mb-2"
              type="text"
              id="text"
              value={uname}
              placeholder="Enter name"
              onChange={(e) => setUname(e.target.value)}
            />
            <input
              className=" border rounded-md bg-transparent text-white px-3 py-2 mb-2"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="  flex flex-col justify-start  align-middle ">
              <input
                className=" border rounded-md py-2 px-3 bg-transparent text-white "
                type="password"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <div className="text-white mt-2 flex">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="w-4 h-4 mr-1 mt-1"
                  onClick={(e) => {
                    handleShowPassword();
                  }}
                />
                <label
                  htmlFor="showPassword"
                  className=" text-md text-gray-200  "
                >
                  Show Password
                </label>
              </div>
            </div>
            <Link
              to="/login"
              className=" text-teal-100 mt-2 mb-3 hover:text-gray-300 "
            >
              Already have an account? Login.
            </Link>
            <input
              className=" hover:bg-transparent hover:text-white border px-3 py-2 bg-white text-black mt-2 rounded-lg"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;

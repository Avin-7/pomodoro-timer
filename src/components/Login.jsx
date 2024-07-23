import React, { useState, useContext } from "react";

import authService from "../appwrite/auth";
import userContext from "../context/userContext";
import service from "../appwrite/config";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData, setLoginStatus, date, usageTime } =
    useContext(userContext);

  const navigate = useNavigate();
  const login = async () => {
    try {
      const session = await authService.login({ email, password });
      if (session) {
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
      console.log(error + ":::error in login.jsx");
    }
  };
  return (
    <div>
      <div className="bg-neutral-950 font-poppins pb-64 ">
        <div>
          <h1 className=" text-white flex justify-center align-middle pt-36 pb-4 text-3xl">
            Login
          </h1>
        </div>
        <div className=" pt-30 flex justify-center align-middle ">
          <form
            action=" "
            className="p-2 pb-14 pt-2 flex-col flex w-1/4 max-lg:w-1/3 max-md:w-2/3 max-sm:w-3/4"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input
              className=" border rounded-md bg-transparent text-white px-3 py-2 mb-2"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className=" border rounded-md bg-transparent text-white px-3 py-2 mb-2"
              type="password"
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <Link
              to="/signup"
              className=" text-white mb-3 hover:text-gray-300 "
            >
              Don&apos;t have an account? Create new one.
            </Link>
            <input
              className=" hover:bg-transparent hover:text-white border px-3 py-2 bg-white text-black mt-2 rounded-lg"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

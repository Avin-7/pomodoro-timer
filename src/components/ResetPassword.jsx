import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const navigate = useNavigate();

  const [password, setPassword] = useState({
    newPassword: "",
    repeatPassword: "",
  });

  const handleShowPassword = () => {
    const ele = document.getElementsByClassName("pass");
    if (ele[0].type == "password") {
      ele[0].type = "text";
      ele[1].type = "text";
    } else {
      ele[0].type = "password";
      ele[1].type = "password";
    }
  };

  const handleResetPassword = async () => {
    try {
      console.log(userId);
      const res = await authService.resetPassword({ userId, secret, password });
      if (res) navigate("/login");
    } catch (error) {
      console.log("ERROR in reset password ", error);
    }
  };
  return (
    <div>
      <div className="bg-neutral-950 font-poppins">
        <div>
          <h1 className=" text-white flex justify-center align-middle pt-36 pb-4 text-3xl">
            Reset password
          </h1>
        </div>
        <div className=" pt-30 flex justify-center align-middle ">
          <form
            action=" "
            className="p-2 pb-14 pt-2 flex-col flex w-1/4 max-lg:w-1/3 max-md:w-11/12 max-sm:w-3/4 max-[320px]:w-4/5 "
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}
          >
            <div className="  flex flex-col justify-start  align-middle ">
              <input
                className="pass border rounded-md py-2 px-3 bg-transparent text-white "
                type="password"
                id="forgotPass"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    newPassword: e.target.value,
                  })
                }
                placeholder="Enter new password"
              />

              <input
                className="pass border rounded-md py-2 px-3 bg-transparent text-white "
                type="password"
                id="repeatPass"
                value={password.repeatPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    repeatPassword: e.target.value,
                  })
                }
                placeholder="repeat password"
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
            <input
              className=" hover:bg-gray-200 border px-3 py-2 bg-white text-black mt-2 rounded-lg transition-all ease-in-out"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

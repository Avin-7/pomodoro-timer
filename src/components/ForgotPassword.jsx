import React, { useState } from "react";
import authService from "../appwrite/auth";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      await authService.forgotPassword({ email });
      console.log("Email has been sent");
    } catch (error) {
      console.log("ERROR in forgot password", error);
    }
  };

  return (
    <div>
      <div className="bg-neutral-950 font-poppins">
        <div>
          <h1 className=" text-white flex justify-center align-middle pt-36 pb-4 text-3xl">
            Forgot Password
          </h1>
        </div>
        <div className=" pt-30 flex justify-center align-middle ">
          <form
            action=" "
            className="p-2 pb-14 pt-2 flex-col flex w-1/4 max-lg:w-1/3 max-md:w-11/12 max-sm:w-3/4 max-[320px]:w-4/5 "
            onSubmit={(e) => {
              e.preventDefault();
              handleForgotPassword();
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

export default ForgotPassword;

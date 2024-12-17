import React from "react";

function Profile() {
  const generateProfilepic = (username = "Avin") => {
    if (username) {
      const shortUsername = username.toUpperCase().substring(0, 2);
      console.log(shortUsername);
      return shortUsername;
    }
  };
  return (
    <div>
      <div className=" w-full">
        <div className="flex items-center justify-center m-8 size-28 rounded-full bg-white  text-black text-5xl font-thin">
          <span>{generateProfilepic()}</span>
        </div>
        <div className=" ml-8">
          <h1 className="mb-4">Email</h1>
          <h2 className=" mb-8">example@gmail.com</h2>

          <h1 className="mb-4">Username</h1>
          <h2 className="mb-8">username_noone</h2>
        </div>

        <h1></h1>
      </div>
    </div>
  );
}

export default Profile;

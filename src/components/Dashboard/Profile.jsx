import React, { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";

function Profile() {
  const { userData } = useContext(userContext);

  const generateProfilepic = (username) => {
    if (username) {
      const shortUsername = username.toUpperCase().substring(0, 2);
      return shortUsername;
    }
  };

  const generateJoinedDate = () => {
    const year = userData.$createdAt?.slice(0, 4);
    let month = userData.$createdAt?.slice(6, 7);
    const day = userData.$createdAt?.slice(9, 10);

    if (month == 1) {
      month = "Jan";
    } else if (month == 2) {
      month = "Feb";
    } else if (month == 3) {
      month = "Mar";
    } else if (month == 4) {
      month = "Apr";
    } else if (month == 5) {
      month = "May";
    } else if (month == 6) {
      month = "Jun";
    } else if (month == 7) {
      month = "Jul";
    } else if (month == 8) {
      month = "Aug";
    } else if (month == 9) {
      month = "Sep";
    } else if (month == 10) {
      month = "Oct";
    } else if (month == 11) {
      month = "Nov";
    } else {
      month = "Dec";
    }

    return month + " " + day + ", " + year;
  };

  return (
    <div>
      <div className=" w-full p-4 grid grid-cols-2 max-md:grid-cols-1 px-20 max-lg:px-4 ">
        <div className="flex items-center justify-center m-8 max-lg:m-2 size-48 max-lg:size-36 rounded-full bg-white text-black text-7xl max-lg:text-5xl font-thin">
          <span>{generateProfilepic(userData?.name)}</span>
        </div>
        <div className=" ml-8 mt-6 max-md:ml-4 max-sm:ml-0 text-white grid grid-cols-2 max-lg:grid-cols-1">
          <div>
            <h1 className="mb-4">Email</h1>
            <span
              className="inline-block w-52 max-sm:w-48 mb-8 px-4 py-3 rounded-md bg-neutral-700"
              value={""}
              disabled={true}
            >
              {userData?.email}
            </span>
          </div>
          <div>
            <h1 className="mb-4">Username</h1>

            <span
              className="inline-block w-52 max-sm:w-48 mb-8 px-4 py-3 rounded-md bg-neutral-700"
              value={""}
              disabled={true}
            >
              {userData?.name}
            </span>
          </div>
          <div>
            <h1 className="mb-4">Joined on</h1>

            <span
              className="inline-block w-52 max-sm:w-48 mb-8 px-4 py-3 rounded-md bg-neutral-700"
              value={""}
              disabled={true}
            >
              {generateJoinedDate()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

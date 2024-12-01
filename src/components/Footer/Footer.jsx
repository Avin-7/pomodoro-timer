import React from "react";

function Footer() {
  return (
    <div>
      <footer className=" flex max-md:flex-col gap-10 justify-center bg-black text-white font-poppins py-20 px-8 w-full">
        <div className="w-2/4">
          <h1 className=" text-xl mb-4">Foczy</h1>
          <h2 className=" text-gray-500 mb-8 text-nowrap">Foczy | Productivity tool</h2>
          <div>
            <a
              href="https://github.com/Avin-7"
              target="_blank"
              className=" mr-6"
            >
              <ion-icon name="logo-github"></ion-icon>
            </a>
            <a href="https://meavin.vercel.app/" target="_blank">
              <ion-icon name="globe-outline"></ion-icon>
            </a>
          </div>
        </div>
        <div className=" w-2/5">
          <h3>Tools</h3>
          <h4 className=" mt-6 text-gray-500">Timer</h4>
          <h4 className=" mt-4 text-gray-500">To-do list</h4>
        </div>
        {/* <div className=" flex gap-8">
          <a
            href="https://github.com/Avin-7"
            target="_blank"
            className=" hover:text-gray-800"
          >
            <ion-icon name="logo-github"></ion-icon>
          </a>
          <a href="https://avin-dcosta.vercel.app/" target="_blank">
            <ion-icon name="globe-outline"></ion-icon>
          </a>
        </div> */}
      </footer>
    </div>
  );
}

export default Footer;

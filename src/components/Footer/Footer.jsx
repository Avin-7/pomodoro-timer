import React from "react";

function Footer() {
  return (
    <div>
      <footer className=" flex justify-center align-middle bg-black text-gray-500 font-poppins py-12 ">
        <div className=" flex gap-8">
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
        </div>
      </footer>
    </div>
  );
}

export default Footer;

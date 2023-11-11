import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  return (
    <header className="w-full h-24 flex p-4 items-center text-text-color bg-background-color">
      <nav className="w-full flex items-center justify-between">
        <h1>Twitter Clone</h1>
        <ul className="hidden md:flex">
          <li className="px-4">Home</li>
          <li className="px-4">Sign In</li>
          <li className="px-4">Sign Up</li>
        </ul>
      </nav>
      <div onClick={handleMenu} className="block md:hidden">
        {!mobileMenu ? (
          <AiOutlineClose size={20} />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </div>
      <nav
        className={
          !mobileMenu
            ? "block  mt-24 fixed right-0 top-0 w-[60%] h-full border-r-accent-color bg-tweet-container-background ease-in-out duration-500 md:hidden"
            : "mt-24 fixed right-[-100%] top-0 h-full ease-in-out duration-500 w-[60%] block md:hidden"
        }
      >
        <ul className="uppercase">
          <li className="p-4 border-b border-tweet-border-color">Home</li>
          <li className="p-4 border-b border-tweet-border-color">Sign In</li>
          <li className="p-4">Sign Up</li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

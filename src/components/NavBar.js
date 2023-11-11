import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import DropDownMenu from "./DropDownMenu";

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
          <li className="px-4 hover:text-link-color hover:cursor-pointer">
            Home
          </li>
          <li className="px-4 hover:text-link-color hover:cursor-pointer">
            Sign In
          </li>
          <li className="px-4 hover:text-link-color hover:cursor-pointer">
            Sign Up
          </li>
        </ul>
      </nav>
      <div
        onClick={handleMenu}
        className="block md:hidden hover:text-link-color hover:cursor-pointer"
      >
        {!mobileMenu ? (
          <AiOutlineClose size={20} />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </div>
      <div>
        <DropDownMenu handleMenu={handleMenu} mobileMenu={mobileMenu} />
      </div>
    </header>
  );
};

export default NavBar;

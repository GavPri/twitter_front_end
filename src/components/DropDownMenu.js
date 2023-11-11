import React from "react";

const MobileMenu = ({ handleMenu, mobileMenu }) => {
  return (
    <nav
      onClick={handleMenu}
      className={
        !mobileMenu
          ? "block  mt-24 fixed right-0 top-0 w-[60%] h-full border-r-accent-color bg-tweet-container-background ease-in-out duration-500 md:hidden"
          : "mt-24 fixed right-[-100%] top-0 h-full ease-in-out duration-500 w-[60%] block md:hidden"
      }
    >
      <ul className="uppercase">
        <li className="p-4 border-b border-tweet-border-color hover:text-link-color hover:cursor-pointer">
          Home
        </li>
        <li className="p-4 border-b border-tweet-border-color  hover:text-link-color hover:cursor-pointer">
          Sign In
        </li>
        <li className="p-4 hover:text-link-color">Sign Up</li>
      </ul>
    </nav>
  );
};

export default MobileMenu;

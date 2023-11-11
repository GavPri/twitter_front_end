import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = ({ handleMenu, mobileMenu, currentUser }) => {
  // logged in links
  const loggedInLinks = <>{currentUser?.username}</>;
  const loggedOutLinks = (
    <>
      <NavLink to="/signin" activeClassName="text-accent-color">
        <li className="p-4 border-b border-tweet-border-color  hover:text-link-color hover:cursor-pointer">
          Sign In
        </li>
      </NavLink>
      <NavLink to="/signup" activeClassName="text-accent-color">
        <li className="p-4 hover:text-link-color">Sign Up</li>
      </NavLink>
    </>
  );
  return (
    <nav
      onClick={handleMenu}
      className={
        !mobileMenu
          ? "block  mt-12 fixed right-0 top-0 w-[60%] h-full border-r-accent-color bg-tweet-container-background ease-in-out duration-500 md:hidden"
          : "mt-12 fixed right-[-100%] top-0 h-full ease-in-out duration-500 w-[60%] block md:hidden"
      }
    >
      <ul className="uppercase">
        <NavLink exact to="/" activeClassName="text-accent-color">
          <li className="p-4 border-b border-tweet-border-color hover:text-link-color hover:cursor-pointer">
            Home
          </li>
        </NavLink>
        {currentUser ? loggedInLinks : loggedOutLinks}
      </ul>
    </nav>
  );
};

export default MobileMenu;

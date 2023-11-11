import React, { useContext, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import DropDownMenu from "./DropDownMenu";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

const NavBar = () => {
  // User Context
  const currentUser = useContext(CurrentUserContext);
  const loggedInLinks = <>{currentUser?.username}</>;
  const loggedOutLinks = (
    <>
      <NavLink to="/signin" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer">
          Sign In
        </li>
      </NavLink>
      <NavLink to="/signup" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer">
          Sign Up
        </li>
      </NavLink>
    </>
  );
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  return (
    <header className="fixed top-0 left-0 w-full h-12 flex p-4 items-center text-text-color bg-background-color">
      <nav className="w-full flex items-center justify-between">
        <NavLink to="/">
          <h1>Twitter Clone</h1>
        </NavLink>
        <ul className="hidden md:flex">
          <NavLink exact to="/" activeClassName="text-accent-color">
            <li className="px-4 hover:text-link-color hover:cursor-pointer">
              Home
            </li>
          </NavLink>
          {currentUser ? loggedInLinks : loggedOutLinks}
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

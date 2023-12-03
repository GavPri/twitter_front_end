import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiFillPlusCircle,
  AiOutlineHeart,
  AiOutlineRead,
  AiOutlineLogout,
} from "react-icons/ai";
import DropDownMenu from "./DropDownMenu";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";

const NavBar = () => {
  // User Context
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const createTweetLink = (
    <>
      <NavLink to="/tweets/create" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex justify-evenly items-center">
          <AiFillPlusCircle size={15} /> <div className="ml-2">Tweet</div>
        </li>
      </NavLink>
    </>
  );
  const loggedInLinks = (
    <>
      <NavLink to="/liked" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex justify-evenly items-center">
          <AiOutlineHeart size={15} /> <div className="ml-2">Liked</div>
        </li>
      </NavLink>
      <NavLink to="/feed" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex justify-evenly items-center">
          <AiOutlineRead size={15} /> <div className="ml-2">Feed</div>
        </li>
      </NavLink>
      <NavLink to="/">
        <li
          className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex justify-evenly items-center"
          onClick={handleSignOut}
        >
          <AiOutlineLogout size={15} /> <div className="ml-2">Sign Out</div>
        </li>
      </NavLink>
      <NavLink to={"/accounts/${currentUser?.account_id}"}>
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex justify-evenly items-center">
          <Avatar src={currentUser?.account_image} text="Profile" height={40} />
        </li>
      </NavLink>
      {createTweetLink}
    </>
  );
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
        {mobileMenu ? (
          <AiOutlineClose size={20} />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </div>
      <div>
        <DropDownMenu
          handleMenu={handleMenu}
          mobileMenu={mobileMenu}
          currentUser={currentUser}
          loggedInLinks={loggedInLinks}
          loggedOutLinks={loggedOutLinks}
          createTweetLink={createTweetLink}
          handleSignOut={handleSignOut}
        />
      </div>
    </header>
  );
};

export default NavBar;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiFillPlusCircle,
  AiOutlineHeart,
  AiOutlineRead,
  AiOutlineLogout,
} from "react-icons/ai";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

const MobileMenu = ({ handleMenu, mobileMenu, handleSignOut }) => {
  const currentUser = useCurrentUser();
  // logged in links
  const createTweetLink = (
    <>
      <NavLink to="/tweets/create" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex justify-start items-center">
          <AiFillPlusCircle size={15} /> <div className="ml-2">Tweet</div>
        </li>
      </NavLink>
    </>
  );
  const loggedInLinks = (
    <>
      <NavLink to="/liked" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex  mb-6 justify-start items-center">
          <AiOutlineHeart size={15} /> <div className="ml-2">Liked</div>
        </li>
      </NavLink>
      <NavLink to="/feed" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex mb-6 justify-start items-center">
          <AiOutlineRead size={15} /> <div className="ml-2">Feed</div>
        </li>
      </NavLink>
      <NavLink to="/">
        <li
          onClick={handleSignOut}
          className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex mb-6 justify-start items-center"
        >
          <AiOutlineLogout size={15} /> <div className="ml-2">Sign Out</div>
        </li>
      </NavLink>
      <NavLink to={`/accounts/${currentUser?.account_id}`}>
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex mb-6 justify-start items-center">
          <Avatar src={currentUser?.account_image} alt="avatar" height={40} />
        </li>
      </NavLink>
      {createTweetLink}
    </>
  );
  const loggedOutLinks = (
    <>
      <NavLink exact to="/" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex mb-6 justify-start items-center">
          <div className="ml-2">Home</div>
        </li>
      </NavLink>
      <NavLink to="/signup" activeClassName="text-accent-color">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex mb-6 justify-start items-center">
          <AiOutlineRead size={15} /> <div className="ml-2">Sign Up</div>
        </li>
      </NavLink>
      <NavLink to="/signin">
        <li className="px-4 hover:text-link-color hover:cursor-pointer w-[100%] flex mb-6 justify-start items-center">
          <AiOutlineLogout size={15} /> <div className="ml-2">Sign In</div>
        </li>
      </NavLink>
    </>
  );
  return (
    <nav
      onClick={handleMenu}
      className={
        mobileMenu
          ? "flex flex-col  justify-start mt-24 fixed right-0 top-0 w-[35%] h-full border-r-accent-color bg-nav-background ease-in-out duration-500 md:hidden rounded-md"
          : "mt-24 fixed right-[-100%] top-0 h-full ease-in-out duration-500 w-[60%] block md:hidden"
      }
    >
      <ul className="uppercase mt-4">
        {currentUser ? loggedInLinks : loggedOutLinks}
      </ul>
    </nav>
  );
};

export default MobileMenu;

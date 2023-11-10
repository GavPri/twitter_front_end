import React from "react";

const NavBar = () => {
  return (
    <header className="w-full h-24 flex p-4 items-center text-text-color bg-background-color">
      <nav className="w-full flex items-center justify-between">
        <h1>Twitter Clone</h1>
        <ul className="flex">
          <li className="px-4">Home</li>
          <li className="px-4">Sign In</li>
          <li className="px-4">Sign Up</li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

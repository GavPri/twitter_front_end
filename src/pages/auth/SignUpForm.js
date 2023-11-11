import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const SignUpForm = () => {
  // Form functionality 
  const [signUpData, setSignUpData] = useState({
    username : '',
    password1: '',
    password2: ''
  })
  // Destructure the signup data
  const { username, password1, password2} = signUpData;
  return (
    <div className="overflow-y-hidden mt-12 mx-auto w-full h-[calc(100vh-24px)] bg-background-color flex justify-center items-center">
      <div className="text-text-color w-[80%] py-6 px-4 border border-tweet-border-color rounded shadow-lg h-[50%] md:w-[50%]">
        <h2 className="text-2xl pb-2">Sign Up!</h2>
        <p className="pb-4 w-full">
          Already have an account?{" "}
          <NavLink to="/signin">
            <span className="text-link-color  hover:text-accent-color">
              Sign In!
            </span>
          </NavLink>
        </p>
        <div>
          <form action="# ">
            <label htmlFor="username" className="hidden">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Username"
              className="w-full border border-tweet-border-color px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accent-color-300 focus:ring
            focus:ring-accent-color-300 mb-6"
            />
            <label htmlFor="password1" className="hidden">
              Username:
            </label>
            <input
              type="password"
              id="password"
              name="password1"
              required
              placeholder="Enter password"
              className="w-full border border-tweet-border-color px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accent-color-300 focus:ring
            focus:ring-accent-color-300 mb-6"
            />
            <label htmlFor="password2" className="hidden">
              Username:
            </label>
            <input
              type="password"
              id="password2"
              name="password2"
              required
              placeholder="Confirm Your Password"
              className="w-full border border-tweet-border-color px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accent-color-300 focus:ring
            focus:ring-accent-color-300 mb-6"
            />
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-link-color hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const SignUpForm = () => {
  return (
    <div className="mt-12 mx-auto w-full h-[calc(100vh-24px)] bg-background-color flex justify-center items-center">
      <div className="text-text-color">
        <h2 className="text-5xl pb-2">Sign Up!</h2>
        <p className="2xl">
          Already have an account?{" "}
          <NavLink to="/signin">
            <span className="text-link-color text-2xl hover:text-accent-color">
              Sign In!
            </span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

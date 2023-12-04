import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  // Form functionality
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  // Destructure the signup data
  const { username, password } = signInData;
  //  History for redirection
  const history = useHistory();
  // Handle change function for form inputs
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };
  // error storage
  const [errors, setErrors] = useState({});
  //  Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  return (
    <div className="overflow-y-hidden mx-auto w-full h-[calc(100vh-24px)] bg-background-color flex justify-center items-center">
      <div className="text-text-color w-[80%] py-6 px-4 border border-tweet-border-color rounded shadow-lg h-fit md:w-[50%]">
        <h2 className="text-2xl pb-2">Sign In!</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="hidden">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              // required
              placeholder="Username"
              className="w-full border border-tweet-border-color px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accent-color-300 focus:ring
            focus:ring-accent-color-300 mb-6 text-background-color"
            />
            {errors.username?.map((message, id) => (
              <div className="w-full h-8 flex justify-center items-center text-rose mb-4 border border-warning px-3 py-2 rounded rounded-md">
                <p className="text-md font-bold text-warning">{message}</p>
              </div>
            ))}
            <label htmlFor="password" className="hidden">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              // required
              placeholder="Enter password"
              className="w-full border border-tweet-border-color px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accent-color-300 focus:ring
            focus:ring-accent-color-300 mb-6 text-background-color"
            />
            {errors.password?.map((message, id) => (
              <div className="w-full h-8 flex justify-center items-center text-rose mb-4 border border-warning px-3 py-2 rounded rounded-md">
                <p className="text-md font-bold text-warning">{message}</p>
              </div>
            ))}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-link-color hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Sign In
            </button>
            {errors.non_field_errors?.map((message, idx) => (
              <div className="w-full h-8 flex justify-center items-center text-rose mb-4 mt-6 border border-warning px-3 py-2 rounded rounded-md">
                <p className="text-md font-bold text-warning">{message}</p>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

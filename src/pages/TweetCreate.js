import React, { useState } from "react";

const TweetCreate = () => {
  const [tweetData, setTweetData] = useState({
    content: "",
    image: "",
  });
  const { content, image } = tweetData;
  // Handle Change
  const handleChange = (event) => {
    setTweetData({
      ...tweetData,
      [event.target.name]: event.target.value,
    });
  };

  // image change
  const handleImageChange = (event) => {
    if (event.target.files.length) {
      setTweetData({
        ...tweetData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  return (
    <div className="w-full h-[90%] flex justify-center items-center">
      {/* text area  */}
      <form className="bg-profile-background w-[80%] md:w-[50%] flex justify-start items-start flex-col">
        <label
          htmlFor="tweetcreate"
          className="text-3xl text-text-color mb-6 justify-start block "
        >
          Tweet
        </label>
        <textarea
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={handleChange}
          placeholder="What's on your mind?"
          className="w-full border border-tweet-border-color px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accent-color-300 focus:ring
            focus:ring-accent-color-300 mb-6 text-background-color resize-none h-40"
        />
        {/* Image upload */}
        <label
          htmlFor="tweetcreatefile"
          className="text-3xl text-text-color mb-6 justify-start block"
        >
          Upload a Pic
        </label>
        <input
          type="file"
          id="tweetcreatefile"
          name="image"
          value={image}
          onChange={handleChange}
          accept="image/*"
          className="file:w-1/3 file:border file:border-tweet-border-color file:px-3 file:py-2 file:rounded-lg file:shadow-sm file:focus:outline-none focus:border-accent-color-300 focus:ring
            file:focus:ring-accent-color-300 file:mb-6 file:text-background-color file:resize-none file:h-10 hover:cursor-pointer"
        />
        <div className="flex w-full justify-between ">
          <button className="w-1/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-warning opacity-50 hover:opacity-100 hover:ease-in-out duration-200 hover:scale-125 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-link-color  hover:scale-125 hover:ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
        {/* two buttons, cancel, tweet */}
      </form>
    </div>
  );
};

export default TweetCreate;

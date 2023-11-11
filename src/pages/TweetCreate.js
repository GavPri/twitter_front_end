import React from "react";

const TweetCreate = () => {
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
          //   id="username"
          name="tweetcreate"
          //   value={tweetcreate}
          //   onChange={handleChange}
          // required
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
          //   id="username"
          name="tweetcreatefile"
          //   value={tweetcreate}
          //   onChange={handleChange}
          // required
          className="file:w-1/3 file:border file:border-tweet-border-color file:px-3 file:py-2 file:rounded-lg file:shadow-sm file:focus:outline-none focus:border-accent-color-300 focus:ring
            file:focus:ring-accent-color-300 file:mb-6 file:text-background-color file:resize-none file:h-10"
        />
        {/* two buttons, cancel, tweet */}
      </form>
    </div>
  );
};

export default TweetCreate;

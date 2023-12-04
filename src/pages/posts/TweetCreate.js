import React, { useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TweetCreate() {
  // ---- store errors
  const [errors, setErrors] = useState({});

  //  ---- deconstruct data
  const [tweetData, setTweetData] = useState({
    content: "",
    image: "",
  });
  const { content, image } = tweetData;

  //  ---- useRef for image upload
  const imageInput = useRef(null);
  // ---- history to redirect user
  const history = useHistory();

  // ---- HandleChange
  const handleChange = (event) => {
    setTweetData({
      ...tweetData,
      [event.target.name]: event.target.value,
    });
  };
  // ---- Handle image change
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setTweetData({
        ...tweetData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  // ---- Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/tweets/", formData);
      history.push(`/feed/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className="w-full h-fit flex justify-center items-center mt-[80px] mb-12">
      {/* text area  */}
      <form
        onSubmit={handleSubmit}
        className="bg-profile-background w-[80%] md:w-[50%] flex justify-start items-start flex-col"
      >
        <label
          htmlFor="content"
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
        {errors?.content?.map((message, idx) => (
          <div
            key={idx}
            className="w-full h-8 flex justify-center items-center text-rose mb-1 border border-warning px-3 py-2 rounded-md"
          >
            <p className="text-md font-bold text-warning">{message}</p>
          </div>
        ))}
        {/* Image upload */}
        <label
          htmlFor="tweet-image"
          className="text-3xl text-text-color mb-6 justify-start block"
        >
          Upload Photo
        </label>
        <div className="rounded overflow-hidden h-50 w-50 flex items-start">
          {image ? (
            <>
              <figure className="rounded-md w-full h-full">
                <img src={image} alt="" className=" object-cover mb-6" />
                <button
                  onClick={handleChangeImage}
                  className=" bottom-0 left-0 w-full mb-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-link-color  focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Change Photo
                </button>
              </figure>
            </>
          ) : (
            <>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                value={image}
                onChange={handleChangeImage}
                ref={imageInput}
                className="file:w-1/3 file:border file:border-tweet-border-color file:px-3 file:py-2 file:rounded-lg file:shadow-sm file:focus:outline-none focus:border-accent-color-300 focus:ring
            file:focus:ring-accent-color-300 file:mb-6 file:text-background-color file:resize-none file:h-10 hover:cursor-pointer"
              />
              {errors?.image?.map((message, idx) => (
                <div
                  key={idx}
                  className="w-full h-8 flex justify-center items-center text-rose mb-1 border border-warning px-3 py-2 rounded-md"
                >
                  <p className="text-md font-bold text-warning">{message}</p>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="flex w-full justify-between ">
          <button
            onClick={() => history.goBack()}
            className="w-1/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-warning opacity-50 hover:opacity-100 hover:ease-in-out duration-200 hover:scale-125 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
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
}

export default TweetCreate;

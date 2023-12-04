import React, { useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form } from "react-bootstrap";

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
      console.log(data);
      history.push(`/feed/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className="w-[80%] md:w-[50%] p-6 rounded-md h-fit flex justify-center items-center mt-[80px] mb-12 bg-tweet-container-background">
      {/* text area  */}
      <form
        // enctype="multipart/form-data"
        onSubmit={handleSubmit}
        className="bg-profile-background w-full p-2 md:w-[90%] flex justify-start items-start flex-col"
      >
        <label
          htmlFor="content"
          className="text-lg text-text-color mb-6 justify-start block "
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
        <p
          htmlFor="image-upload"
          className="text-lg text-text-color mb-6 justify-start block"
        >
          Upload Photo
        </p>
        <div className="rounded overflow-hidden h-50 w-50 flex items-start">
          {image ? (
            <>
              <figure className="rounded-md w-full h-full">
                <img
                  src={image}
                  alt="upload image"
                  className=" object-cover mb-6"
                />
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
              <Form.Label htmlFor="image-upload" className="hidden">
                Upload An Image
              </Form.Label>
            </>
          )}
        </div>
        <div className="w-full">
          {/* <Form.File
            id="image-upload"
            accept="image/*"
            onChange={handleChangeImage}
            ref={imageInput}
          /> */}
          <Form.Group className="mb-3 h-12 w-full flex flex-col items-center ">
            <Form.Label className="text-text-color sr-only">
              Default file input example
            </Form.Label>
            <Form.Control
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imageInput}
              className=" block text-sm text-file-text w-full selection:file:mr-4 file:py-2 file:px-4
              file:border-0
              file:text-sm file:font-semibold
              file:rounded-md
              file:bg-link-color file:text-text-color
              hover:file:bg-link-color-600 hover:cursor-pointer"
            />
          </Form.Group>
          {errors?.image?.map((message, idx) => (
            <div
              key={idx}
              className="w-full h-8 flex justify-center items-center text-rose mb-1 border border-warning px-3 py-2 rounded-md"
            >
              <p className="text-md font-bold text-warning">{message}</p>
            </div>
          ))}
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

import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";

const Tweet = (props) => {
  const {
    id,
    owner,
    account_id,
    account_image,
    comments_count,
    likes_count,
    like_id,
    content,
    image,
    tweetPage,
    setTweet,
  } = props;
  // handleLike function
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { tweet: id });
      setTweet((prevTweet) => ({
        ...prevTweet,
        results: prevTweet.results.map((tweet) => {
          return tweet.id === id
            ? { ...tweet, likes_count: tweet.likes_count + 1, like_id: data.id }
            : tweet;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { tweet: id });
      setTweet((prevTweet) => ({
        ...prevTweet,
        results: prevTweet.results.map((tweet) => {
          return tweet.id === id
            ? {
                ...tweet,
                likes_count: tweet.likes_count - 1,
                like_id: null,
              }
            : tweet;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  //   Find out if current user owns the page
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  return (
    <div className="w-[80%] bg-tweet-container-background h-[80px] flex justify-center items-center">
      <div className="w-full h-[10%] flex justify-between items-start">
        <img
          src={currentUser?.account_image}
          alt="avatar"
          className="h-[80%]"
        />
      </div>
      <span className="text-3xl">...</span>
      {/* content */}
      <div className="w-full h-fit">{content}</div>
      {/* image */}
      {image ? (
        <div className="h-[40%] w-full object-contain">
          <div className="h-full w-full">{image}</div>
        </div>
      ) : null}
      <div className="flex w-full h-10 justify-between p-4">
        {is_owner ? (
          <p>
            You Cant Like Your Own Posts! <AiOutlineHeart />{" "}
          </p>
        ) : like_id ? (
          <span className="text-warning" onClick={(handleUnLike) => {}}>
            <AiOutlineHeart size={20} />
          </span>
        ) : currentUser ? (
          <span onClick={(handleLike) => {}}>
            <AiOutlineHeart size={20} />
          </span>
        ) : (
          <p>
            {" "}
            Log in to like posts! <AiOutlineHeart size={10} />
          </p>
        )}
        {likes_count}
        <NavLink to="/posts/${id}">
          <AiOutlineComment />
        </NavLink>
      </div>
    </div>
  );
};

export default Tweet;

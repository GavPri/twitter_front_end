import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";

const Tweet = (props) => {
  const {
    id,
    owner,
    updated_at,
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
    // Boot strap card
    <Card className="flex flex-col items-center justify-between bg-tweet-container-background p-4 rounded-md text-text-color mb-16">
      <Card.Body className="w-full h-full border-b-2 border-tweet-border-color pb-2">
        <Media className="flex items-center justify-between w-full ">
          <div className="flex items-center justify-start w-[33%]">
            <NavLink to={`/accounts/${account_id}`}>
              <Avatar src={account_image} height={40} />
            </NavLink>
            <span className="block ml-4">{owner}</span>
          </div>
          <div className="flex items-center justify-center w-[40%]">
            <span className="text-sm mr-4">{updated_at}</span>
            {is_owner && tweetPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Card.Body className=" flex items-start w-full h-full py-4">
        {content}
      </Card.Body>
      <Card.Img src={image} alt="content"></Card.Img>
      <div className="w-full h-fit mt-4 p-4 bg-accent-color">
        {/* Check if current user is the owner */}
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own posts!</Tooltip>}
          >
            <AiOutlineHeart size={25} />
          </OverlayTrigger>
        ) : like_id ? (
          <span
            className="bg-warning text-text-color text-lg"
            onClick={handleUnLike}
          >
            <AiOutlineHeart size={25} />
          </span>
        ) : currentUser ? (
          <span className="text-lg" onClick={handleLike}>
            <AiOutlineHeart size={25} />
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Log in to like a post</Tooltip>}
          >
            <AiOutlineHeart size={25} />
          </OverlayTrigger>
        )}
      </div>
    </Card>
  );
};

export default Tweet;

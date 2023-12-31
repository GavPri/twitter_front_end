import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { EditDeleteDropDown } from "../../components/MoreDropDown";
import { useHistory } from "react-router";


const Tweet = (props) => {
  const {
    id,
    owner,
    updated_at,
    account_id,
    account_image,
    replies_count,
    likes_count,
    like_id,
    content,
    image,
    tweetPage,
    setTweets,
  } = props;
  // handleLike function
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { tweet: id });
      setTweets((prevTweet) => ({
        ...prevTweet,
        results: prevTweet.results.map((tweet) => {
          return tweet.id === id
            ? { ...tweet, likes_count: tweet.likes_count + 1, like_id: data.id }
            : tweet;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };
  const handleUnLike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setTweets((prevTweets) => ({
        ...prevTweets,
        results: prevTweets.results.map((tweet) => {
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
      // console.log(err);
    }
  };
  //   Find out if current user owns the page
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const handleEdit = () => {
    history.push(`/tweets/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tweets/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    // Boot strap card
    <Card className="flex flex-col items-center justify-between bg-tweet-container-background p-4 rounded-md w-[320px] md:w-[640px] text-text-color mb-4">
      <Card.Body className="w-full h-full border-b-2 border-tweet-border-color pb-2">
        <Media className="flex items-center justify-between w-full ">
          <div className="flex items-center justify-start w-[33%]">
            <NavLink to={`/accounts/${account_id}`}>
              <Avatar src={account_image} height={40} />
            </NavLink>
            <span className="block ml-4">{owner}</span>
          </div>
          <div className="flex w-[50%] md:w-[30%]">
            <span className="text-xs md:text-sm mr-4 flex items-center ">
              <span className="mr-2">{updated_at}</span>{" "}
              {is_owner && tweetPage && (
                <EditDeleteDropDown handleEdit={handleEdit} handleDelete={handleDelete}/>
              )}
            </span>
          </div>
        </Media>
      </Card.Body>
      <NavLink
        to={`/tweets/${id}`}
        className="flex flex-col items-start justify-start w-full h-full py-4"
      >
        {image ? (
          <>
            <Card.Body className="mb-4">{content}</Card.Body>
            <Card.Img src={image} alt="content" className="w-full" />
          </>
        ) : (
          <Card.Body className="mb-2">{content}</Card.Body>
        )}
      </NavLink>

      <div className="w-full h-fit p-4 bg-accent-color flex items-center justify-center rounded-md">
        {/* Check if current user is the owner */}
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip className="bg-link-color text-text-color mb-2 p-4 rounded-md transition-opacity ease-in-out duration-350">
                You can't like your own posts!
              </Tooltip>
            }
          >
            <AiOutlineHeart size={25} className="mr-2 hover:cursor-pointer" />
          </OverlayTrigger>
        ) : like_id ? (
          <span
            className="text-warning text-lg mr-2 hover:cursor-pointer"
            onClick={handleUnLike}
          >
            <AiFillHeart size={25} />
          </span>
        ) : currentUser ? (
          <span
            className="text-text-color text-lg mr-2 hover:cursor-pointer"
            onClick={handleLike}
          >
            <AiOutlineHeart size={25} />
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip className="bg-link-color text-text-color mb-2 p-4 rounded-md transition-opacity ease-in-out duration-350">
                Log in to like a post
              </Tooltip>
            }
          >
            <AiOutlineHeart size={25} className="hover:cursor-pointer" />
          </OverlayTrigger>
        )}
        {likes_count}
        <Link to={`/tweets/${id}`}>
          <AiOutlineComment size={25} className="ml-4 mr-2" />
        </Link>
        {replies_count}
      </div>
    </Card>
  );
};

export default Tweet;

import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { Card, Media } from "react-bootstrap";

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
    // Boot strap card
    <Card className="w-full h-full flex flex-col items-center justify-between bg-warning">
      <Media className="items-center justify-between">
        <NavLink to={`/accounts/${account_id}`}>
          <Avatar src={account_image} height={55} /> {owner}
        </NavLink>
      </Media>
    </Card>
  );
};

export default Tweet;

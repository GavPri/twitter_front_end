import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./Tweet";
import { axiosReq } from "../../api/axiosDefaults";
import ReplyForm from "../replies/ReplyForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";

const TweetPage = () => {
  //  access url
  const { id } = useParams();
  const [tweet, setTweet] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const account_image = currentUser?.account_image;
  const [replies, setReplies] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: tweet }] = await Promise.all([
          axiosReq.get(`/tweets/${id}`),
        ]);
        setTweet({ results: [tweet] });
        console.log(tweet);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div className="w-[100%] md:w-[50%] h-[full] mt-16 flex justify-center items-center flex-col">
      <Tweet {...tweet.results[0]} setTweet={setTweet} tweetPage />
      <div className="flex items-center justify-between w-full">
        {currentUser ? (
          <ReplyForm
            account_id={currentUser.account_id}
            accountImage={account_image}
            tweet={id}
            setTweet={setTweet}
            setReplies={setReplies}
          />
        ) : replies.results.length ? (
          "Comments"
        ) : null}
      </div>
    </div>
  );
};

export default TweetPage;

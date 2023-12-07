import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./Tweet";
import { axiosReq } from "../../api/axiosDefaults";
import ReplyFrom from "../replies/ReplyFrom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
    <div className="w-[100%] md:w-[50%] h-[full] mt-16 flex justify-center items-center">
      <Tweet {...tweet.results[0]} setTweet={setTweet} tweetPage />
    </div>
  );
};

export default TweetPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./Tweet";
import { axiosReq } from "../../api/axiosDefaults";

const TweetPage = () => {
  //  access url
  const { id } = useParams();
  const [tweet, setTweet] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: tweet }] = await Promise.all[
          axiosReq.get("/tweets/${id}")
        ];
        setTweet({ results: [tweet] });
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div className="w-full h-full mt-12">
      <h1 className="text-3xl text-text-color ">
        <Tweet {...tweet.results[0]} setTweet={setTweet} tweetPage />
      </h1>
    </div>
  );
};

export default TweetPage;

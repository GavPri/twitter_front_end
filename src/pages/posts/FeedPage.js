import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Tweet from "./Tweet";
import { axiosReq } from "../../api/axiosDefaults";

const FeedPage = ({ message, filter = "" }) => {
  const [tweets, setTweets] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`tweets/?${filter}`);
        setTweets(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

  return (
    <div className="flex flex-col mt-24 items-center justify-start rounded-md">
      {hasLoaded ? (
        <>
          {tweets.results.length ? (
            tweets.results.map((tweet) => (
              <Tweet key={tweet.id} {...tweet} setTweets={setTweets} />
            ))
          ) : (
            <div className="p-6 bg-link-color flex flex-col w-[80%] items-center justify-center rounded-md h-fit">
              <h2 className="text-text-color text-3xl">404</h2>
              <p className="text-text-color text-md">{message}</p>
            </div>
          )}
        </>
      ) : (
        console.log("loading")
      )}
    </div>
  );
};

export default FeedPage;

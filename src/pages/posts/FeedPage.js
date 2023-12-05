import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Tweet from "./Tweet";
import { axiosReq } from "../../api/axiosDefaults";
import { Form } from "react-bootstrap";

const FeedPage = ({ message, filter = "" }) => {
  const [tweets, setTweets] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  // Search
  const [query, SetQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`tweets/?${filter}search=${query}`);
        setTweets(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname, query]);

  return (
    <div>
      <Form onSubmit={(event) => event.preventDefault()} className="mt-4 ">
        <Form.Control
          value={query}
          onChange={(event) => {
            SetQuery(event.target.value);
          }}
          type="text"
          className="p-2 bg-background-color border-2 text-link-color focus:outline-none border-tweet-border-color placeholder:italic placeholder:text-link-color rounded-md w-[360px] md:w-[432px]"
          placeholder="Search..."
        />
      </Form>
      <div className="flex flex-col mt-4 items-center justify-start rounded-md">
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
    </div>
  );
};

export default FeedPage;

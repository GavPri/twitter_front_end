import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Tweet from "./Tweet";
import { axiosReq } from "../../api/axiosDefaults";
import { Form } from "react-bootstrap";
import LoadingBar from "react-top-loading-bar";
import InfiniteScroll from "react-infinite-scroll-component";

const FeedPage = ({ message, filter = "" }) => {
  const [tweets, setTweets] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  // Search
  const [query, SetQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingBarProgress(75);
        const { data } = await axiosReq.get(`tweets/?${filter}search=${query}`);
        setTweets(data);
        setLoadingBarProgress(100);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, query]);

  return (
    <div>
      <div className="fixed top-0 left-0 h-6 w-full z-50">
        <LoadingBar
          height={3}
          color="#e11d48"
          progress={loadingBarProgress}
          onLoaderFinished={() => setLoadingBarProgress(0)}
        />
      </div>
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
              <InfiniteScroll
                children={tweets.results.map((tweet) => (
                  <Tweet key={tweet.id} {...tweet} setTweets={setTweets} />
                ))}
                dataLength={tweets.results.length}
                loader={
                  <div className="fixed top-0 left-0 h-6 w-full z-50">
                    <LoadingBar
                      height={3}
                      color="#e11d48"
                      progress={loadingBarProgress}
                      onLoaderFinished={() => setLoadingBarProgress(0)}
                    />
                  </div>
                }
                hasMore={!!tweets.next}
                next={() => {}}
              />
            ) : (
              <div className="p-6 bg-link-color flex flex-col w-[80%] items-center justify-center rounded-md h-fit">
                <p className="text-text-color text-md">{message}</p>
                {/* Progress bar */}
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./Tweet";
import { axiosReq } from "../../api/axiosDefaults";
import ReplyForm from "../replies/ReplyForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Reply from "../replies/Reply";

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
        const [{ data: tweet }, { data: replies }] = await Promise.all([
          axiosReq.get(`/tweets/${id}`),
          axiosReq.get(`/replies/?tweet=${id}`),
        ]);
        setTweet({ results: [tweet] });
        setReplies(replies);
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div className="w-[100%]  h-[full] mt-16 flex justify-center items-center flex-col">
      <Tweet {...tweet.results[0]} setTweet={setTweet} tweetPage />
      <div className="flex flex-col items-start justify-evenly w-[320px] md:w-[640px]">
        {currentUser ? (
          <ReplyForm
            account_id={currentUser.account_id}
            accountImage={account_image}
            tweet={id}
            setTweet={setTweet}
            setReplies={setReplies}
          />
        ) : replies.results.length ? (
          "Replies"
        ) : null}
        {replies.results.length ? (
          replies.results.map((reply) => (
            <Reply
              key={reply.id}
              {...reply}
              accountImage={account_image}
              setTweet={setTweet}
              setReplies={setReplies}
            />
          ))
        ) : currentUser ? (
          <p>No replies yet, be the first to reply</p>
        ) : (
          <p>No replies</p>
        )}
      </div>
    </div>
  );
};

export default TweetPage;

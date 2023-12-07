import React from "react";
import { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";

function ReplyFrom(props) {
    const { tweet, setTweet, setReplies, accountImage, account_id} = props
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post(`/replies/`, {
        content, 
        tweet,
      });
      setReplies((prevReplies) => ({
        ...prevReplies,
        results: [data, ...prevReplies.results]
      }))
    } catch (err) {}
  };

  return <div>ReplyFrom</div>;
}

export default ReplyFrom;

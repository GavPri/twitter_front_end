import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./Tweet";

const TweetPage = () => {
  //  access url
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all[
          axiosReq.get("/tweets/${id}")
        ];
        setPost({ results: [post] });
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div className="w-full h-full mt-12">
      <h1 className="text-3xl text-text-color ">
        <Tweet />
      </h1>
    </div>
  );
};

export default TweetPage;

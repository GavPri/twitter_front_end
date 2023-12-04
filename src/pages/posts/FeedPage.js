import { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axiosReq from "../../api/axiosDefaults"

const FeedPage = ({ message, filter=""}) => {

    const[tweets, setTweets] = useState({ results: []});
    const[hasLoaded, setHasLoaded] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {data} = await axiosReq.get(`tweets/?${filter}`)
                setTweets(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        setHasLoaded(false)
        fetchPosts()
    }, [filter, pathname])
  return <h1 className="text-text-color">Hello, this is the feed page!</h1>;
};

export default FeedPage;

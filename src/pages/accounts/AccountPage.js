import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useAccountData,
  useSetAccountData,
} from "../../contexts/AccountDataContext";
import { Button, Image } from "react-bootstrap";
import PopularProfiles from "./PopularAccounts";

const AccountPage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  // extarct id from url
  const { id } = useParams();
  // account data
  const setAccountData = useSetAccountData();
  const { pageAccount } = useAccountData();
  const [account] = pageAccount.results;
  // check if logged in user owns the profile
  const is_owner = currentUser?.username === account?.owner;
  // use state for tweets
  const [accountTweets, setAccountTweets] = useState({results : []})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageAccount }] = await Promise.all([
          axiosReq.get(`/accounts/${id}/`),
        ]);
        setAccountData((prevState) => ({
          ...prevState,
          pageAccount: { results: [pageAccount] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setAccountData]);
  return (
    <div className="mt-16 h-fit bg-profile-background w-[320px] md:w-[640px] p-4 border-2 border-tweet-border-color flex rounded">
      <div className="flex justify-center w-80% items-start basis-1/4">
        <Image src={account?.image} className="rounded-full" />
      </div>
      <div className="flex flex-col w-full items-start justify-evenly p-2">
        <div className="w-full">
          <div className="w-full flex items-start justify-start">
            <h3 className="text-lg text-profile-text-color">
              {account?.owner}
            </h3>
          </div>
          <div className="flex basis-3/4 w-full justify-between mb-2">
            <p className="md:text-md text-link-color px-2">
              {account?.tweet_count} <span>Posts</span>
            </p>
            <p className="md:text-md text-link-color px-2">
              {account?.followers_count} <span>Followers</span>
            </p>
            <p className="text-md text-link-color px-2">
              {account?.following_count} <span>Following</span>
            </p>
          </div>
        </div>
        <div className="w-full">
          {currentUser &&
            !is_owner &&
            (account?.following_id ? (
              <Button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-link-color hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                Unfollow
              </Button>
            ) : (
              <Button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-link-color hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                Follow
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

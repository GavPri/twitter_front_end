import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useAccountData,
  useSetAccountData,
} from "../../contexts/AccountDataContext";
import { Image } from "react-bootstrap";
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
    <div className="mt-16 h-24 bg-profile-background w-fit p-4 border-2 border-tweet-border-color ">
      <div>
        <Image src={account?.image} className="rounded-full" />
      </div>
      <div>
        <div>
          <h3>{account?.owner}</h3>
        </div>
        <div>{/* follow button  or edit profile button*/}</div>
      </div>
    </div>
  );
};

export default AccountPage;

import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetAccountData } from "../../contexts/AccountDataContext";

const AccountPage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  // extarct id from url
  const { id } = useParams();
  // account data
  const setAccountData = useSetAccountData();

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
        console.log(err)
      }
    };
    fetchData()
  }, [id, setAccountData]);
  return (
    <div className="mt-16 h-24 bg-profile-background w-fit p-4 border-2 border-tweet-border-color ">
      <div>{/* Avatar */}</div>
      <div>
        <div>{/* user info */}</div>
        <div>{/* follow button  or edit profile button*/}</div>
      </div>
    </div>
  );
};

export default AccountPage;

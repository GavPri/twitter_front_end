import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PopularProfiles = () => {
    // current user
    const currentUser = useCurrentUser
  const [accountData, setAccountData] = useState({
    pageAccount: { results: [] },
    popularAccounts: { results: [] },
  });
  const popularAccounts = accountData;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/account/?ordering=-followers-count"
        );
        setAccountData(prevState => ({
            ...prevState,
            popularAccounts : data,
        }))
      } catch (err) {
        console.log(err)
      }
    };

    handleMount()
  });
  return (
    <div className="mt-4">
      <p className="text-text-color text-lg">Most Followed Profiles</p>
    </div>
  );
};

export default PopularProfiles;

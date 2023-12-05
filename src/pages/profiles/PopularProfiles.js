import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const PopularProfiles = () => {
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
      } catch (err) {}
    };
  });
  return (
    <div className="mt-4">
      <p className="text-text-color text-lg">Most Followed Profiles</p>
    </div>
  );
};

export default PopularProfiles;

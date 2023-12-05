import React, { useEffect, useState } from "react";

const PopularProfiles = () => {
  const [accountData, setAccountData] = useState({
    pageAccount: { results: [] },
    popularAccounts: { results: [] },
  });
  const popularAccounts = accountData;

  useEffect(() => {
    const handleMount = async () => {
        try {
            
        } catch (err) {
            
        }
    }
  })
  return (
    <div className="mt-4">
      <p className="text-text-color text-lg">Most Followed Profiles</p>
    </div>
  );
};

export default PopularProfiles;

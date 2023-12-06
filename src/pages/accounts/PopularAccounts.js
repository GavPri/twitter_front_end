import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Account from "./Account";
import { useAccountData } from "../../contexts/AccountDataContext";

const PopularProfiles = () => {
  // --- current user

  // const { popularAccounts } = accountData;

  // request for profiles
  const { popularAccounts } = useAccountData();

  //   ----- Is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-4 rounded-md bg-tweet-container-background border-2 border-tweet-border-color md:flex-col md:fixed md:right-4 md:top-20 md:items-start md:mt-0 md:w-fit">
      <p className="text-text-color text-lg w-full md:p-2">Popular Profiles</p>
      <div
        className={`flex ${
          isMobile ? "flex-row justify-between" : "md:flex-col"
        } md:mb-4 md:ml-2 m-2`}
      >
        {popularAccounts.results.slice(0, isMobile ? 5 : 8).map((account) => (
          <Link
            to={`/accounts/${account.id}`}
            className={`flex ${
              isMobile ? "flex-row" : null
            } items-center md:mb-2`}
            key={account.id}
          >
            <Account key={account.id} account={account} isMobile={isMobile} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularProfiles;

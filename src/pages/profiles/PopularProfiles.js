import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { NavLink } from "react-bootstrap";

const PopularProfiles = () => {
  // current user
  const currentUser = useCurrentUser();
  const [accountData, setAccountData] = useState({
    pageAccount: { results: [] },
    popularAccounts: { results: [] },
  });
  const { popularAccounts } = accountData;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/accounts/?ordering=-followers-count"
        );
        setAccountData((prevState) => ({
          ...prevState,
          popularAccounts: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

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
    <div className="mt-4 rounded-md bg-tweet-container-background border-2 border-tweet-border-color md:flex-col md:fixed md:right-0 md:top-20 md:items-start md:mt-0 md:w-fit">
      <p className="text-text-color text-lg w-full md:p-2">Popular Profiles</p>
      <div
        className={`flex ${
          isMobile ? "flex-row justify-between" : "md:flex-col"
        } md:mb-4 md:ml-2 m-2`}
      >
        {popularAccounts.results
          .slice(0, isMobile ? 5 : undefined)
          .map((account) => (
            <NavLink
              to="/"
              className={`flex ${
                isMobile ? "flex-row" : null
              } items-center md:mb-2`}
              key={account.id}
            >
              <Avatar src={account.image} height={20} />
              <p className="ml-1 mr-2 text-text-color hover:cursor-pointer hover:text-link-color">
                {account.owner}
              </p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default PopularProfiles;
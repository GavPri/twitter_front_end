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
  return (
    <div className="mt-4 rounded-md flex bg-tweet-container-background border-2 border-tweet-border-color md:flex-col md:fixed md:right-0 md:top-20  md:items-start   md:mt-0 md:w-fit">
      <p className="text-text-color text-lg w-full md:p-2">Popular Profiles</p>
      {popularAccounts.results.map((account) => (
        <NavLink to="/" className="md:flex md:flex-row-reverse md:mb-4 md:ml-2">
          <p
            className="md:ml-2 text-text-color hover:cursor-pointer hover:text-link-color"
            key={account.id}
          >
            {account.owner}
          </p>
          <Avatar src={account.image} className="hidden md:block" height={30} />
        </NavLink>
      ))}
    </div>
  );
};

export default PopularProfiles;

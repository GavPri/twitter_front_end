import { createContext, useEffect, useState, useContext } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { click } from "@testing-library/user-event/dist/click";
import { unfollowHelper } from "../utils/utils";

// ----- Create Context Objects
const AccountDataContext = createContext();
const SetAccountDataContext = createContext();

// ---- Custom hooks
export const useAccountData = () => useContext(AccountDataContext);
export const useSetAccountData = () => useContext(SetAccountDataContext);

// ---- export function component
export const AccountDataProvider = ({ children }) => {
  const [accountData, setAccountData] = useState({
    pageAccount: { results: [] },
    popularAccounts: { results: [] },
  });
  // const { popularAccounts } = accountData;

  const currentUser = useCurrentUser();

  // --- handleFollow
  const handleFollow = async (clickedAccount) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedAccount.id,
      });

      setAccountData((prevState) => ({
        ...prevState,
        popularAccounts: {
          ...prevState.popularAccounts,
          results: prevState.popularAccounts.results.map((account) => {
            return account.id === clickedAccount.id
              ? {
                  ...account,
                  followers_count: account.followers_count + 1,
                  following_id: data.id,
                }
              : account.is_owner
              ? { ...account, following_count: account.following_count + 1 }
              : account;
          }),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };
  // --- handle unfollow
  const handleUnfollow = async (clickedAccount) => {
    try {
      await axiosRes.delete(`/followers/${clickedAccount.following_id}/`);
      setAccountData((prevState) => ({
        ...prevState,
        pageAccount: {
          results: prevState.popularAccounts.results.map((account) =>
            unfollowHelper(account, clickedAccount)
          ),
        },
        popularAccounts: {
          ...prevState.popularAccounts,
          results: prevState.popularAccounts.results.map((account) =>
            unfollowHelper(account, clickedAccount)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };
  // request for profiles
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
    <AccountDataContext.Provider value={accountData}>
      <SetAccountDataContext.Provider
        value={{ setAccountData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetAccountDataContext.Provider>
    </AccountDataContext.Provider>
  );
};

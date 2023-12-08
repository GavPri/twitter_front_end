import { createContext, useEffect, useState, useContext } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { click } from "@testing-library/user-event/dist/click";

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
      const { data } = await axiosRes.post('/follower/', {
        followed: clickedAccount.id
      })
    } catch (err) {
      console.log(err)
    }
  }

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
      <SetAccountDataContext.Provider value={{setAccountData, handleFollow}}>
        {children}
      </SetAccountDataContext.Provider>
    </AccountDataContext.Provider>
  );
};

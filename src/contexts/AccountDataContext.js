import { createContext, useEffect, useState, useContext } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

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
      <SetAccountDataContext.Provider value={setAccountData}>
        {children}
      </SetAccountDataContext.Provider>
    </AccountDataContext.Provider>
  );
};

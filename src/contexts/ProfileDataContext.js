import { createContext } from "react";

// ----- Create Context Objects
export const AccountDataContext = createContext();
export const setAccountDataContext = createContext();

// ---- Custom hooks
export const useAccountData = () => createContext(AccountDataContext);
export const useSetAccountData = () => createContext(setAccountDataContext);

// ---- export function component
export const AccountDataProvider = ({ children }) => {
  const [accountData, setAccountData] = useState({
    pageAccount: { results: [] },
    popularAccounts: { results: [] },
  });
  const { popularAccounts } = accountData;

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
};

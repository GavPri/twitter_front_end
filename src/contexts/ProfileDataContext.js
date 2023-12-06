import { createContext } from "react";

// ----- Create Context Objects
export const ProfileDataContext = createContext();
export const setProfileDataContext = createContext();

// ---- Custom hooks
export const useProfileData = () => createContext(ProfileDataContext);
export const useSetProfileData = () => createContext(setProfileDataContext);

// ---- export function component
export const ProfileDataProvider = ({ children }) => {
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

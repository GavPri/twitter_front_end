import { createContext } from "react";

// ----- Create Context Objects
export const ProfileDataContext = createContext()
export const setProfileDataContext = createContext();

// ---- Custom hooks
export const useProfileData = () => createContext(ProfileDataContext)
export const useSetProfileData = () => createContext(setProfileDataContext);
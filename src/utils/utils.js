import { axiosReq } from "../api/axiosDefaults";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === CurrentUserContext.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const unfollowHelper = (account, clickedAccount) => {
  return account.id === clickedAccount.id
    ? {
        ...account,
        followers_count: account.followers_count - 1,
        followers_id: null,
      }
    : account.is_owner
    ? {
        ...account,
        following_count: account.following_count - 1,
      }
    : account;
};

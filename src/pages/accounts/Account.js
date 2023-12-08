import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useSetAccountData } from "../../contexts/AccountDataContext";

const Account = (props) => {
  const { account, isMobile, imageSize = 35 } = props;
  const { id, following_id, image, owner } = account;
  const { handleFollow, handleUnfollow } = useSetAccountData();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  return (
    <div className="w-full">
      <div className={`my-3 flex items-center ${isMobile ? "flex-col" : ""}`}>
        <div>
          <Link to={`/accounts/${id}`} className="self-center">
            <Avatar src={image} height={imageSize} />
          </Link>
        </div>
        <div className="ml-2">
          <strong className="text-text-color text-sm">{owner}</strong>
        </div>
        <div className="ml-auto">
          {!isMobile &&
            currentUser &&
            !is_owner &&
            (following_id ? (
              <Button
                onClick={() => {
                  handleUnfollow(account);
                }}
                className="flex
                justify-center
                p-2
                border
                border-transparent
                rounded-lg
                shadow-sm
                text-md
                font-medium
                text-text-color
                bg-link-color
                ml-2
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2"
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className="flex
                justify-center
                p-2
                border
                border-transparent
                rounded-lg
                shadow-sm
                ml-2
                font-medium
                text-text-color
                bg-link-color
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2"
                onClick={() => {
                  handleFollow(account);
                }}
              >
                Follow
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Account;

import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import Avatar from "../../components/Avatar";

const Account = (props) => {
  const { account, isMobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = account;

  const currentUser = useCurrentUser;
  const is_owner = currentUser?.username === owner;
  return (
    <div>
      <div className={`my-3 flex items-center ${isMobile ? "flex-col" : ""}`}>
        <div>
          <Link to={`/profiles/${id}`} className="self-center">
            <Avatar src={image} height={imageSize} />
          </Link>
        </div>
        <div>
          <strong>{owner}</strong>
        </div>
        <div>
          {!isMobile &&
            currentUser &&
            !is_owner &&
            (following_id ? (
              <Button>unfollow</Button>
            ) : (
              <Button>follow</Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Account;

import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Image } from "react-bootstrap";
import Avatar from "../../components/Avatar";
const Reply = (props) => {
  const { account_id, accountImage, owner, updated_at, content } = props;
  console.log(accountImage);
  return (
    <div className="flex text-text-color items-start w-[320px] p-4 rounded-md mb-2 md:w-[640px] bg-tweet-container-background">
      <Link to={`/accounts/${account_id}`}>
        <Avatar src={accountImage} />
      </Link>
      <div className="ml-4 items-start">
        <p className="font-bold text-link-text">{owner.username}</p>
        <span className="text-gray-500 text-sm">{updated_at}</span>
        <p className="w-full">{content}</p>
      </div>
    </div>
  );
};

export default Reply;

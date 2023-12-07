import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
const Reply = (props) => {
  const { account_id, account_image, owner, updated_at, content } = props;
  return (
    <div className="flex items-start w-[320px] p-4 rounded-md mb-2 md:w-[640px] bg-tweet-container-background">
      <Link to={`/accounts/${account_id}`}>
        <Avatar src={owner.account_image} />
      </Link>
      <div className="ml-4">
        <p className="font-bold">{owner.username}</p>
        <span className="text-gray-500 text-sm">{updated_at}</span>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Reply;

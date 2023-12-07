import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Image } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { EditDeleteDropDown } from "../../components/MoreDropDown";
import { axiosRes } from "../../api/axiosDefaults";
const Reply = (props) => {
  const currentUser = useCurrentUser();
  const {
    account_id,
    accountImage,
    owner,
    updated_at,
    content,
    id,
    setTweet,
    setReply,
  } = props;
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/replies/${id}`);
      setTweet((prevTweet) => ({
        results: [
          {
            ...prevTweet.results[0],
            replies_count: prevTweet.results[0].replies_count - 1,
          },
        ],
      }));

      setReply((prevReply) => ({
        ...prevReply,
        results: prevReply.results.filter((reply) => reply.id !== id),
      }));
    } catch (err) {}
  };

  console.log(accountImage);
  return (
    <div className="flex text-text-color items-start w-[320px] p-4 rounded-md mb-2 md:w-[640px] bg-tweet-container-background">
      <Link to={`/accounts/${account_id}`}>
        <Avatar src={accountImage} />
      </Link>
      <div className="ml-4 flex flex-col justify-start w-full items-start">
        <div className="w-full flex justify-start items-start">
          <p className="font-bold text-link-text">{owner.username}</p>
          <span className="text-gray-500 text-sm">{updated_at}</span>
        </div>
        <p className="w-fit">{content}</p>
      </div>
      <EditDeleteDropDown handleEdit={() => {}} handleDelete={handleDelete} />
    </div>
  );
};

export default Reply;

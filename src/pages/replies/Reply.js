import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { EditDeleteDropDown } from "../../components/MoreDropDown";
import { axiosRes } from "../../api/axiosDefaults";
import { useState } from "react";
import ReplyEditForm from "./ReplyEditForm";

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
    setReplies,
  } = props;
  const [showEditForm, setShowEditForm] = useState(false);
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

      setReplies((prevReplies) => ({
        ...prevReplies,
        results: prevReplies.results.filter((reply) => reply.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div className="flex text-text-color items-start w-[320px] p-4 rounded-md mb-2 md:w-[640px] bg-tweet-container-background">
      <Link to={`/accounts/${account_id}`}>
        <Avatar src={accountImage} />
      </Link>
      <div className="ml-4 flex flex-col justify-start w-full items-start">
        <div className="w-full flex justify-start items-start">
          <p className="font-bold text-link-text">{owner.username}</p>
          <span className="text-gray-500 text-sm">{updated_at}</span>
        </div>{" "}
        <div className="bg-text-color flex p-2 rounded-md justify-between items-start text-tweet-container-background w-full">
          {showEditForm ? (
            <ReplyEditForm
              id={id}
              account_id={account_id}
              content={content}
              accountImage={accountImage}
              setReplies={setReplies}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
          {is_owner && !showEditForm && (
            <EditDeleteDropDown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;

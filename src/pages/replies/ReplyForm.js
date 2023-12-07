import React from "react";
import { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ReplyFrom(props) {
  const { tweet, setTweet, setReplies, accountImage, account_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post(`/replies/`, {
        content,
        tweet,
      });
      setReplies((prevReplies) => ({
        ...prevReplies,
        results: [data, ...prevReplies.results],
      }));
      setTweet((prevTweet) => ({
        results: [
          {
            ...prevTweet.results[0],
            replies_count: prevTweet.results.comments + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {}
  };

  return (
    <div className="mt-2 rounded-md bg-tweet-container-background p-2 flex w-[320px] md:w-[640px]">
      <Form className="w-full p-4 " onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <InputGroup className="flex basis-3/4">
            <Link to={`/accounts/${account_id}`} className="mr-2">
              <Avatar src={accountImage} />
            </Link>
            <textarea
              className="w-full px-3 py-2 border rounded-md resize-none"
              placeholder="my reply..."
              value={content}
              onChange={handleChange}
              rows={2}
            />
          </InputGroup>
        </Form.Group>
        <button
          className="bg-link-color text-text-color px-4 py-2 rounded-md w-1/5"
          disabled={!content.trim()}
          type="submit"
        >
          Reply
        </button>
      </Form>
    </div>
  );
}

export default ReplyFrom;

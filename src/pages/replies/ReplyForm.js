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
    <div>
      <Form className="mt-2" onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <Link to={`/accounts/${account_id}`}>
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto"
          disabled={!content.trim()}
          type="submit"
        >
          post
        </button>
      </Form>
    </div>
  );
}

export default ReplyFrom;

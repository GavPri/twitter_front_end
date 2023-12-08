import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

function ReplyEditForm(props) {
  const { id, content, setShowEditForm, setReplies } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/replies/${id}`, {
        content: formContent.trim(),
      });
      setReplies((prevReplies) => ({
        ...prevReplies,
        results: prevReplies.results.map((reply) => {
          return reply.id === id
            ? {
                ...reply,
                content: formContent.trim(),
                updated_at: "now",
              }
            : reply;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="pr-1 w-full">
      <Form.Group className=" flex flex-col items-start justify-between pr-1 w-full">
        <Form.Control
          className="resize-none"
          as="textarea"
          value={formContent}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="text-right">
        <button onClick={() => setShowEditForm(false)} type="button">
          cancel
        </button>
        <button disabled={!content.trim()} type="submit">
          save
        </button>
      </div>
    </Form>
  );
}

export default ReplyEditForm;

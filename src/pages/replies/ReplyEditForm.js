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
      // console.log(err);
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
      <div className="text-right flex w-full  justify-between items-center">
        <button
          className="w-1/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-warning opacity-50 hover:opacity-100 hover:ease-in-out duration-200 hover:scale-125 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-text-color bg-link-color"
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default ReplyEditForm;

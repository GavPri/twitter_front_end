import React from "react";
import { useState } from "react";

function ReplyFrom() {
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  return <div>ReplyFrom</div>;
}

export default ReplyFrom;

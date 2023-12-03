import React from "react";

const Avatar = ({ src, height, text }) => {
  return (
    <span>
      <img
        className="object-cover m-0 mr-8 mb-0 ml-8 rounded full"
        src={src}
        alt="avatar"
        height={height}
        width={height}
      />
      {text}
    </span>
  );
};

export default Avatar;

import React from "react";

const Avatar = ({ src, height, text }) => {
  return (
    <div className="flex">
      <span>
        <img
          className="object-cover rounded full"
          src={src}
          alt="avatar"
          height={height}
          width={height}
        />
        {text}
      </span>
    </div>
  );
};

export default Avatar;

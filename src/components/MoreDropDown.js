import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  AiFillCaretDown,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const TweetDropDown = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className="hover:cursor-pointer"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export const EditDeleteDropDown = ({ handleEdit }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={TweetDropDown}>
        <AiFillCaretDown />
      </Dropdown.Toggle>

      <Dropdown.Menu className="flex flex-col h-fit w-fit items-start justify-between bg-accent-color p-2 rounded-md">
        <Dropdown.Item
          onClick={handleEdit}
          eventKey="1"
          className="pb-2 flex items-center justify-between "
        >
          <AiOutlineEdit /> <p className="ml-2">Edit</p>
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          className="flex items-center justify-between"
        >
          <AiOutlineDelete /> <p className="ml-2">Delete</p>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

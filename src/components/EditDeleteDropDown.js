import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { AiFillCaretDown } from "react-icons/ai";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const TweetDropDown = React.forwardRef(({ onClick }, ref) => (
  <AiFillCaretDown
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const EditDeletDropDown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={TweetDropDown} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

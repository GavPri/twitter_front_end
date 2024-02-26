// ----- imports for custom toast
import React, { useState } from "react";
import { Toast, Button } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";

// ---- toast component
const ChangeImageToast = ({ showToast, toggleToast }) => {
  // ---- react-bootstap toast with custom styles
  return (
    <>
      <Button
        onClick={toggleToast}
        type="button"
        className="flex justify-between items-center border-none bg-transparent shadow-none p-0 mb-2"
      >
        Change image?
        <AiOutlineInfoCircle className="ml-2" />
      </Button>
      <Toast
        show={showToast}
        onClose={toggleToast}
        animation={true}
        className="text-text-color bg-transparent rounded-md max-h-16 mb-2 "
      >
        <Toast.Body className="px-0">
          To change your image, click choose file and select a new one!
        </Toast.Body>
      </Toast>
    </>
  );
};

export default ChangeImageToast;

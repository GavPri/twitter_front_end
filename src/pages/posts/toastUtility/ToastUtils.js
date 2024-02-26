import React, {useState} from "react";

const ToastUtils = () => {
  // ---- toast state
  const [showToast, setShowToast] = useState(false);

  // ---- toggle toast function
  const toggleToast = () => setShowToast(!showToast);

  return {showToast, toggleToast}
}
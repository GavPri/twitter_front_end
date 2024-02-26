import React, {useState} from "react";

export const useToast = () => {
  // ---- toast state
  const [showToast, setShowToast] = useState(false);

  // ---- toggle toast function
  const toggleToast = () => setShowToast(!showToast);

  return {showToast, toggleToast}
}
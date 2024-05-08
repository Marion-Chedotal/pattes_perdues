import React, { useState, useEffect } from "react";
import "./SuccessMessage.scss";
import { useLocation } from "react-router-dom";

const SuccessMessage = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location]);
  useEffect(() => {
    if (successMessage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 10000); // 10 secondes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div>
      {" "}
      {successMessage && (
        <div className="successMessage text-center alert alert-success">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default SuccessMessage;
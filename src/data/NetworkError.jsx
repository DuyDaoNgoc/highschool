import React from "react";
import "../App.css";
const NetworkError = () => {
  return (
    <div className="network-error">
      <span className="background_network"></span>
      {}
      <p>Network connection lost. Please check your internet and try again.</p>
    </div>
  );
};

export default NetworkError;

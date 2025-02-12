import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../data/loading";
import NetworkError from "../data/NetworkError";
import Menu from "../data/nav_menu";

const SaveCategory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("your_api_endpoint");
      if (!response.ok) throw new Error("Network response was not ok");
      // Handle success logic
    } catch (error) {
      setIsNetworkError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOffline(!navigator.onLine);
    };
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  useEffect(() => {
    if (isOffline) {
      setMessage("No internet connection. Please try again later.");
    } else {
      setMessage("");
    }
  }, [isOffline]);

  useEffect(() => {
    if (!isOffline) fetchData();
  }, [isOffline]);

  if (isOffline) {
    return (
      <div className="offline-notification">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>save</div>
      </div>
      {message && <p className="err_login">{message}</p>}
      {isLoading && <Loading />}
      {isNetworkError && <NetworkError />}
    </div>
  );
};

export default SaveCategory;

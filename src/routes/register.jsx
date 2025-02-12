import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../data/loading";
import NetworkError from "../data/NetworkError";
import Menu from "../data/nav_menu";
import "../css/login.css";
import "../data/remote_panda";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!username || !password || !confirmPassword) {
      setMessage("All fields must be filled!");
      return;
    }

    // Check password length
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // Check if username already exists
      const checkUserResponse = await fetch(
        "https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/login"
      );
      const users = await checkUserResponse.json();

      const userExists = users.some((user) => user.username === username);

      if (userExists) {
        setMessage("Username already exists.");
        return;
      }

      // Register new user
      const response = await fetch(
        "https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        setMessage("Registration failed: " + errorData);
        throw new Error("Registration failed!");
      }

      const data = await response.json();
      console.log("Registration successful: ", data); // Log data for debugging

      setMessage("Registration successful! Please update your profile.");

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Error during registration.");
      setIsNetworkError(true);
      console.error(error); // Log error for debugging
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkNetwork = () => {
      if (navigator.onLine) {
        setIsOffline(false);
        setMessage("");
      } else {
        setIsOffline(true);
        setMessage("No internet connection.");
      }
    };

    checkNetwork();
    window.addEventListener("online", checkNetwork);
    window.addEventListener("offline", checkNetwork);

    return () => {
      window.removeEventListener("online", checkNetwork);
      window.removeEventListener("offline", checkNetwork);
    };
  }, []);

  return (
    <div>
      <div className="background-pj-v2">
        <div className="panda-face">
          <div className="ear-l" id="ear-l"></div>
          <div className="ear-r" id="ear-r"></div>
          <div>
            <div className="eye-l" id="eye-l">
              <div className="eyeball-l" id="eyeL"></div>
            </div>
            <div className="eye-r" id="eye-r">
              <div className="eyeball-r" id="eyeR"></div>
            </div>
            <div className="blush-l" id="blush-l"></div>
            <div className="blush-r" id="blush-r"></div>
            <div className="nose" id="nose"></div>
            <div className="mouth" id="mouth"></div>
          </div>
          <div className="hand-l" id="handL"></div>
          <div className="hand-r" id="handR"></div>
          <div className="paw-l" id="paw-l"></div>
          <div className="paw-r" id="paw-r"></div>
        </div>

        <h2>Register</h2>
        <form onSubmit={handleRegister} className="login_form">
          <div className="user-pass">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              id="username"
            />
          </div>
          <div className="user-pass">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
            />
          </div>
          <div className="user-pass">
            <label>Confirm Password:</label>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password..."
            />
          </div>
          <button type="submit" disabled={isLoading || isOffline}>
            Register
          </button>
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </form>
        {message && <p className="err_login">{message}</p>}
        {isLoading && <Loading />}
        {isNetworkError && <NetworkError />}
      </div>
    </div>
  );
}

export default Register;

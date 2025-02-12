import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../data/loading";
import NetworkError from "../data/NetworkError";
import "../css/login.css";
import Menu from "../data/nav_menu";
import "../data/remote_panda";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Username and password cannot be empty.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (isOffline) {
      setMessage("No internet connection. Please try again later.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/login"
      );
      if (!response.ok) {
        throw new Error("Unable to connect to the server.");
      }

      const data = await response.json();
      const user = data.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        setMessage("Login successful!");
        localStorage.setItem("username", user.username);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("email", user.email);
        localStorage.setItem("phone", user.phone);

        // Cập nhật thêm thông tin tài khoản
        const updatedUser = {
          ...user,
          lastLogin: new Date().toISOString(),
          isActive: true,
        };

        const updateResponse = await fetch(
          `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/login/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );

        if (!updateResponse.ok) {
          throw new Error("Failed to update user information.");
        }

        navigate("/");
      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      setIsNetworkError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="background_login">
          <div className="panda-face">
            <div className="ear-l"></div>
            <div className="ear-r"></div>
            <div>
              <div className="eye-l">
                <div className="eyeball-l" id="eyeL"></div>
              </div>
              <div className="eye-r">
                <div className="eyeball-r" id="eyeR"></div>
              </div>
              <div className="blush-l"></div>
              <div className="blush-r"></div>
              <div className="nose"></div>
              <div className="mouth"></div>
            </div>
            <div className="hand-l" id="handL"></div>
            <div className="hand-r" id="handR"></div>
            <div className="paw-l"></div>
            <div className="paw-r"></div>
          </div>
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="login_form">
            <div className="user-pass">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                id="username"
              />
            </div>
            <div className="user-pass">
              <label>Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                id="password"
              />
            </div>
            <button type="submit" disabled={isLoading || isOffline}>
              Login
            </button>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </form>
          {message && <p className="err_login">{message}</p>}
          {isLoading && <Loading />}
          {isNetworkError && <NetworkError />}
          {isOffline && (
            <div className="offline-notification">
              <p>
                You are currently offline. Please check your internet
                connection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

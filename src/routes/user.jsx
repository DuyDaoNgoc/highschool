import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Loading from "../data/loading";
import NetworkError from "../data/NetworkError";
import "../css/user-highschool.css";

const ProjectsUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [name, setName] = useState(localStorage.getItem("fullname"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "../images/avatar.jpg"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Thêm state để điều khiển menu

  const fetchData = async () => {
    setIsLoading(true);
    setIsNetworkError(false);

    try {
      const response = await fetch(
        "https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/login"
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      setIsNetworkError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        setIsNetworkError(true);
      }
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  if (isLoading) return <Loading />;
  if (isNetworkError) return <NetworkError />;

  return (
    <article className="article-ur">
      <div className="background-projects_user">
        <ul className="setting-menu">
          <li>
            <span className="span-btn">
              <button
                id="toggle-menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Setting
              </button>
            </span>

            <ul className={`menu-st-user ${isMenuOpen ? "show" : "hidden"}`}>
              <li>
                <button onClick={() => navigate("/CustomerInfo")}>
                  Chỉnh sửa thông tin cá nhân
                </button>{" "}
              </li>
              <li>Thay đổi nền</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="border-avatar">
        <img src={avatar} alt="Avatar" className="avarta-user" />
        <div>
          <h2>{name}</h2>
        </div>
      </div>
    </article>
  );
};

export default ProjectsUser;

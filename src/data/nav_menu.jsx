import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/highschool.css";
import "../css/menu.css";
import "../css/login.css";
import "../css/user.css";
import Loading from "./loading";

const Menu = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("fullname") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
      setName(localStorage.getItem("fullname"));
    }
  }, []);

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/courses?search=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error: Unable to search courses", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchResults.length > 0) {
        navigate(`/thong-sanpham/${searchResults[0].id}`);
      } else {
        alert("No results found for the entered query");
      }
    }
  };

  const handleSearchResultClick = (setName) => {
    if (setName) {
      navigate(`/thong-sanpham/${setName}`);
    } else {
      alert("Invalid course ID");
    }
  };

  const handleSearchButtonClick = () => {
    if (searchQuery) {
      if (searchResults.length > 0) {
        navigate(`/thong-sanpham/${searchResults[0].id}`);
      } else {
        alert("No results found for the entered query");
      }
    } else {
      alert("Please enter a search term");
    }
  };

  return (
    <div className="padd_nav_menu">
      <nav className="nav_menu_main">
        <div>
          <img src="/logo_hight_school.png" alt="High School Logo" />
        </div>
        <ul className="nav_menu">
          {[
            { name: "Home", link: "/" },
            { name: "Courses", link: "/Courses" },
            { name: "Instructors", link: "/instructors" },
            { name: "Schedules", link: "/schedules" },
            { name: "Contact Us", link: "/contact" },
          ].map((item, index) => (
            <div key={index}>
              <li>
                <a href={item.link}>{item.name}</a>
              </li>
              <p>
                <a href={item.link}>{item.name}</a>
              </p>
            </div>
          ))}
        </ul>
        {username ? (
          <div style={{ display: "flex" }}>
            <div className="form-user">
              <span className="find">
                <img
                  src="/Remove_find.png"
                  alt="find icon"
                  style={{
                    width: "10%",
                    position: "absolute",
                    left: "151px",
                  }}
                />
                <input
                  type="search"
                  name="username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a course"
                />
                <a href={`/thong-sanpham/${searchQuery}`} className="menu_a-sr">
                  Tìm kiếm
                </a>
              </span>
            </div>
            <div style={{ padding: "10px" }}>
              <div className="menu-user">
                <span>{name}</span>
                <ul className="main-pj">
                  <li className="li-user">
                    <input
                      type="checkbox"
                      id="menu-toggle"
                      className="toggle-checkbox"
                    />
                    <label htmlFor="menu-toggle">
                      <img
                        src="\icon\menu-hamburger-svgrepo-com.svg"
                        alt="Menu"
                      />
                    </label>
                    <ul className="background-pj">
                      <li>
                        <button onClick={() => navigate("/user")}>
                          Account Information
                        </button>
                      </li>
                      <span>
                        <hr />
                      </span>
                      <li>
                        <button onClick={() => navigate("/Save-Category")}>
                          Saved Category
                        </button>
                      </li>
                      <span>
                        <hr />
                      </span>
                      <li>
                        <button>Statistics</button>
                      </li>
                      <span>
                        <hr />
                      </span>
                      <li>
                        <button onClick={() => navigate("/CustomerInfo")}>
                          Setting
                        </button>
                      </li>
                      <span>
                        <hr />
                      </span>
                      <li>
                        <button
                          type="button"
                          className="logout"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <form className="form" method="post">
            <span className="find">
              <img
                src="/Remove_find.png"
                alt="find icon"
                style={{
                  width: "5%",
                  position: "absolute",
                  left: "151px",
                }}
              />
              <input
                type="search"
                name="username"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a course"
              />
              <a href={`/thong-sanpham/${searchQuery}`} className="menu_a-sr">
                Tìm kiếm
              </a>
            </span>
            <button
              type="button"
              className="submit_login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              type="submit"
              className="register"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </form>
        )}
      </nav>
    </div>
  );
};

export default Menu;

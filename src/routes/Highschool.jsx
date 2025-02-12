import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/highschool.css";
import Slide from "./Silde";
import Loading from "../data/loading";
import NetworkError from "../data/NetworkError";
import ContentHighSchool from "./content_high_school";
import "../css/user.css";
const HighSchool = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(localStorage.getItem("fullname") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [course, setCourse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = async () => {
    setIsLoading(true);
    setIsNetworkError(false);
    try {
      const mockData = [
        { id: 1, name: "Course 1", description: "Description for Course 1" },
      ];
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setData(mockData);
    } catch (error) {
      setIsNetworkError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!navigator.onLine) {
      setIsNetworkError(true);
      setIsLoading(false);
    } else {
      fetchData();
    }
    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
      setName(localStorage.getItem("fullname"));
      setEmail(localStorage.getItem("email"));
      setPhone(localStorage.getItem("phone"));
    }
    const handleNetworkChange = () => {
      if (navigator.onLine) {
        fetchData();
      } else {
        setIsNetworkError(true);
        setIsLoading(false);
      }
    };
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);
  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("username");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    navigate("/");
  };
  const handleSearchButtonClick = () => {
    if (searchQuery) {
      navigate(`/thong-sanpham/${searchQuery}`);
    }
  };
  return (
    <div className="main-content">
      <header className="hdermenu">
        <div>
          <nav className="nav_menu_f">
            <div>
              <img src="/logo_hight_school.png" alt="logo" />
            </div>
            <ul className="nav_menu">
              {[
                { name: "Home", link: "/" },
                { name: "Courses", link: "./Courses" },
                { name: "Instructors", link: "./instructors" },
                { name: "Schedules", link: "./schedules" },
                { name: "Contact Us", link: "./contact" },
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
                    <a
                      href={`./thong-sanpham/${searchQuery}`}
                      className="menu_a-sr"
                    >
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
                            <button onClick={() => navigate("./user")}>
                              Account Information
                            </button>
                          </li>
                          <span>
                            <hr />
                          </span>
                          <li>
                            <button onClick={() => navigate("./Save-Category")}>
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
                            <button onClick={() => navigate("./CustomerInfo")}>
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
                  <img src="/Remove_find.png" alt="find icon" />
                  <input type="search" name="username" />
                </span>
                <button
                  type="button"
                  className="submit_login"
                  onClick={() => navigate("./login")}
                >
                  Login
                </button>
                <button
                  type="submit"
                  className="register"
                  onClick={() => navigate("./register")}
                >
                  Register
                </button>
              </form>
            )}
          </nav>

          <div className="title_student">
            <h1>A Classical Education for the Future</h1>
            <p>
              We prepare you to engage in the world that is and to help bring
              about a world that ought to be.
            </p>
            <button onClick={() => navigate("./login")}>Get Started</button>
          </div>
        </div>
      </header>

      {isLoading ? (
        <Loading />
      ) : isNetworkError ? (
        <NetworkError />
      ) : (
        <>
          <Slide />
          <ContentHighSchool data={data} />
        </>
      )}
    </div>
  );
};

export default HighSchool;

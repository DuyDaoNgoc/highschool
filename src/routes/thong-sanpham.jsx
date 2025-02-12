import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../data/nav_menu";
import "../css/thong-sanpham1.css";
import Loading from "../data/loading";
import NetworkError from "../data/NetworkError";
import { faker } from "@faker-js/faker";

const ProductDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("fullname") || "");
  const [userId, setUserId] = useState(localStorage.getItem("username") || "");
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "/images/avatar.jpg"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/courses/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }

        const data = await response.json();
        setCourse(data);
        setLikes(data.likes || 0);
        setCommentsList(Array.isArray(data.comment) ? data.comment : []);
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch(
          `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/courses/name=${searchQuery}`
        );

        if (!response.ok) {
          throw new Error("Failed to search courses");
        }

        const data = await response.json();
        if (data.length > 0) {
          setCourse(data[0]);
        } else {
          alert("No course found with that name.");
        }
      } catch (error) {
        console.error("Error searching courses:", error.message);
      }
    }
  };

  const checkLogin = () => {
    const isLoggedIn = localStorage.getItem("username");
    if (!isLoggedIn) {
      alert("Please login to perform this action.");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleLike = async () => {
    if (!checkLogin()) return;

    const hasLiked = localStorage.getItem(`liked-${userId}-${id}`);

    if (hasLiked) {
      const newLikes = likes - 1;

      try {
        const response = await fetch(
          `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/courses/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...course, likes: newLikes }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update likes");
        }

        const updatedCourse = await response.json();
        setLikes(updatedCourse.likes);
        localStorage.removeItem(`liked-${userId}-${id}`);
      } catch (error) {
        console.error("Error updating likes:", error.message);
      }
    } else {
      const newLikes = likes + 1;

      try {
        const response = await fetch(
          `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/courses/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...course, likes: newLikes }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update likes");
        }

        const updatedCourse = await response.json();
        setLikes(updatedCourse.likes);
        localStorage.setItem(`liked-${userId}-${id}`, true);
      } catch (error) {
        console.error("Error updating likes:", error.message);
      }
    }
  };

  const handleBuy = () => {
    if (!checkLogin()) return;
    alert("Proceeding with course purchase");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!checkLogin()) return;

    if (!comment.trim()) {
      return;
    }

    const newComment = {
      text: comment.trim(),
      userId: userId,
      username: name,
      avatar: avatar,
      createdAt: new Date().toISOString(),
    };

    try {
      const updatedComments = [...commentsList, newComment];

      const response = await fetch(
        `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/courses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...course,
            comment: updatedComments,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const updatedCourse = await response.json();
      setCommentsList(updatedCourse.comment);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error.message);
      alert("There was an error submitting your comment. Please try again.");
    }
  };

  if (!course) {
    return <Loading />;
  }

  return (
    <div>
      <Menu />
      <div className="left-res">
        <button onClick={() => navigate("/Courses")}>
          <img src="/icon/left-svgrepo-com.svg" alt="" />
        </button>
      </div>
      <div className="product-details">
        <div className="products">
          <div className="product-sp">
            <img src={course.avatar} alt={course.name} />
            <div className="content-sp-main">
              <div>
                <h2>{course.name}</h2>
                <p>{course.description}</p>
                <p>
                  <span className="bold-sp">Price:</span> {course.price}$
                </p>
                <p>
                  <span className="bold-sp">Duration:</span> {course.week} weeks
                </p>
              </div>
              <div>
                <div className="dis-heart">
                  <button onClick={handleLike} className="heart-like">
                    <img src="/icon/heart-svgrepo-com.svg" alt="" />
                  </button>
                  <p>
                    {likes} <span className="bold-sp">Likes</span>
                  </p>
                </div>
                <button onClick={handleBuy} className="btn-sp">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1>Content</h1>
            <p>{course.content}</p>
          </div>
          <div>
            <h1>Comment</h1>
            <form onSubmit={handleCommentSubmit} className="comment-sp">
              <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Enter your comment"
              />
              <button type="submit">Send</button>
            </form>
            <div className="back-comment">
              {Array.isArray(commentsList) && commentsList.length > 0 ? (
                commentsList.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <div className="avatar-comment">
                      <div className="comment-avatar">
                        <img
                          src={comment.avatar || "/images/avatar.jpg"}
                          alt=""
                          className="img-avatar"
                        />
                      </div>
                      <div>
                        <div className="user-com-avar">
                          <b>{comment.username}</b>
                          <p>{comment.text}</p>
                        </div>
                        <small>
                          {comment.username} at{" "}
                          {new Date(comment.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

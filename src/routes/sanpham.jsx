import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Courses-online.css";
import Loading from "../data/loading";

const Sanpham = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/courses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch course list");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleClickProduct = (courseId) => {
    navigate(`/thong-sanpham/${courseId}`);
  };

  if (isLoading) {
    return (
      <p>
        <Loading />
      </p>
    );
  }

  if (error) {
    return (
      <p>
        <Loading />
      </p>
    );
  }

  return (
    <article className="article_sort_by">
      <div className="article_div_popular">
        <div className="transform_explore">
          <div className="title-courses-s">
            <p>Explore our popular courses</p>
          </div>
        </div>

        <div className="display_figure">
          {courses.map((course) => (
            <figure key={course.id} className="figure_star">
              <button
                onClick={() => handleClickProduct(course.id)}
                className="a_star"
              >
                <img src={course.avatar} alt={course.name} />
                <div className="display_star">
                  <figcaption className="ficaption_star">
                    <h3>{course.name}</h3>
                  </figcaption>
                  <div className="review_star">
                    <img
                      src="/Explore_our_popular_course/star.png"
                      alt="star"
                    />
                    <p>{course.students} Students</p>
                  </div>
                </div>
                <div className="content_star">
                  <div>
                    <p>{course.week} weeks</p>
                  </div>
                  <div className="money">
                    <p>{course.price}$</p>
                  </div>
                </div>
              </button>
            </figure>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Sanpham;

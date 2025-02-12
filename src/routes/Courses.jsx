import React, { useState, useEffect } from "react";
import "../css/Courses.css";
import Loading from "../data/loading";
import "../css/Explore_our_popular_course.css";
import { useNavigate } from "react-router-dom";
import NetworkError from "../data/NetworkError";

import Sanpham from "../routes/sanpham";
const Courses = () => {
  const handleRedirect = (url) => {
    window.location.href = url;
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  const TIMEOUT_LIMIT = 10000; // 10 giây chờ tải dữ liệu

  const fetchData = () => {
    setIsLoading(true);
    setIsTimeout(false);
    setIsNetworkError(false);

    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsTimeout(true);
        setIsLoading(false);
      }
    }, TIMEOUT_LIMIT);

    setTimeout(() => {
      clearTimeout(timeout);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const handleNetworkChange = () => {
      const online = navigator.onLine;
      setIsNetworkError(!online);
      if (online) fetchData();
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="AG_3d_high-school ">
        <div className="parallax">
          <div className="content_Ag_high_school">
            <div className="content_courses">
              <div className="title_courses">
                <h1> Van Lang HIGH SCHOOL </h1>
                <h1>
                  {" "}
                  <p>NURTURING TALENT</p>
                </h1>
              </div>

              <p>
                Studying abroad opportunities for Vietnamese students today are
                extremely open, even at the high school level. However, choosing
                a satisfactory high school often comes with many different
                challenges. More specifically, at an age when students'
                psychology is still maturing, stepping out into the ocean is not
                an easy step for many parents. Understanding that , MAX
                Education has developed the{" "}
                <span className="bold-font">
                  {" "}
                  Academic Guardian - High School
                </span>
              </p>
              <p>
                program with the aim of helping parents grasp the appropriate
                path to develop their students' abilities and find the most
                suitable environment for their children's high school. MAX
                students have been admitted to top Boarding Schools such as{" "}
                <span className="text-decretion_content">
                  St. Andrew's, Northfield Mount Hermon, Lake Forest Academy,
                  Cranbrook, Mount Michael, Woodburry, Taft School, The Village
                  School, Fairmont Preparatory Academy{" "}
                </span>
                , etc. and many schools in the top 5 of the states.
              </p>
              <button onClick={() => handleRedirect("/register")}>
                Sign up for consultaion
              </button>
            </div>
          </div>
          <div className="AG_high_school "></div>
        </div>
      </div>
      <div className="vanlang_scholarship">
        <div className="hr_school">
          <h1>Van Lang HIGH SCHOOL SCHOLARSHIP CONSULTING </h1>
          <div className="hr_vanlang"></div>
        </div>

        <div className="stack_all">
          <div className="stack">
            <img src="/icon/research-svgrepo-com.svg" alt="" />
            <h1>Initial research</h1>
            <p>
              Vietnamese parents/students who want to learn about studying
              abroad at high school level in the near future
            </p>
          </div>
          <div className="stack">
            <img src="/icon/Developingopportunities.svg" alt="" />
            <h1>Developing opportunities</h1>
            <p>
              Parents/Students have decided on the path to study abroad in high
              school but want to learn more about opportunities
            </p>
          </div>
          <div className="stack">
            <img src="/icon/text-documents-svgrepo-com.svg" alt=""></img>
            <h1>Prepare documents</h1>
            <p>
              Parents/Students are applying to high schools but do not know how
              to build a suitable profile and application
            </p>
          </div>
        </div>
        <article>
          <div className="Courses-main">
            <div>
              <div className="title-courses">
                <h1>What is special about Van Lang High School? </h1>
              </div>
              <ol>
                <li>Personalized Coaching</li>
                <li>Comprehensive Development</li>
                <li>Guardian monitors closely and continuously</li>
                <li>3-way bridge: Students - Family - Foreign University</li>
                <li>Share, support mentally and psychologically</li>
                <li>Career counseling & guidance (if needed) </li>
              </ol>
              <div className="color-bold-courses">
                <b>
                  100% of MAX students participating in the AG High School
                  program receive scholarships and financial support from their
                  high school{" "}
                  <span className="decrection-courses"> of at least 30% .</span>
                </b>
                <div>
                  <i>
                    Get 10% off the entire course for old customers of MAX
                    Education.
                  </i>
                </div>
                <button className="btn-main-courses">Learn more</button>
              </div>
            </div>
            <div className="what-vanlang"></div>
          </div>
        </article>
        <Sanpham />
      </div>

      {isLoading && !isTimeout && <Loading />}
      {(isNetworkError || isTimeout) && <NetworkError />}
    </div>
  );
};

export default Courses;

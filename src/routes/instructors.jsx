import react, { useNavigate, useEffect, useState } from "react";
import React from "react";
import "../css/instructor.css";
import NetworkError from "../data/NetworkError";
import Loading from "../data/loading";
const Instructors = () => {
  // const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  // const [isNetworkError, setIsNetworkError] = useState(false);
  // const [isOffline, setIsOffline] = useState(!navigator.onLine);
  return (
    <div>
      <div>
        <article className="ar-instructors">
          <figcaption>
            TEAM OF TEACHERS WITH EXPERIENCE IN CONQUERING HIGH SCHOOL
            SCHOLARSHIPS
          </figcaption>
          <small>
            Coaches come from the world's top schools and have top profiles in
            the market.{" "}
          </small>
          <div className="ins-fig-content">
            <figure className="figure_instructors">
              <img
                src="/images/giangvien.png"
                alt="gian vien giang
            "
                className="img-instructors"
              />
              <p>Master</p>
              <h1>Hoang Vu Hong Doan</h1>
              <ul>
                <li>Bachelor of Pharmacology at King's College London (UK)</li>
                <li>
                  Master of Health Management at Imperial College London (UK)
                </li>
                <li>
                  Master of Public Health at University of Melbourne (Australia)
                </li>
              </ul>
            </figure>
            <figure className="figure_instructors">
              <img
                src="/images/giangvien2.png"
                alt="gian vien giang
            "
                className="img-instructors"
              />
              <p>Master</p>
              <h1>Vanessa Le</h1>
              <ul>
                <li>Master of Foreign Service from Georgetown University</li>
                <li>BA in International Relations from UC San Diego</li>
              </ul>
            </figure>
            <figure className="figure_instructors">
              <img
                src="/images/giangvien3.png"
                alt="gian vien giang
            "
                className="img-instructors"
              />
              <p>Master</p>
              <h1>Hoang Vu Hong Doan</h1>
              <ul>
                <li>
                  Master's degree in Linguistics & English Teaching in the
                  United States (Benedictine University, Illinois)
                </li>
                <li>Former Head of Training and Academics at MAX Education</li>
              </ul>
            </figure>
          </div>
        </article>
      </div>
    </div>
  );
};
export default Instructors;

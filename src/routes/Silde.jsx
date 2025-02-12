import React, { useEffect, useState } from "react";
import "../css/highschool.css";

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setSlides(document.querySelectorAll(".header_student span"));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(
      () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      },

      3000
    );

    return () => clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }, [currentIndex, slides]);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="header_student">
      {" "}
      <span
        data-slide="1"
        className={currentIndex === 0 ? "active" : ""}
      ></span>{" "}
      <span
        data-slide="2"
        className={currentIndex === 1 ? "active" : ""}
      ></span>{" "}
      <span
        data-slide="3"
        className={currentIndex === 2 ? "active" : ""}
      ></span>{" "}
      <button className="prev" onClick={prevSlide}>
        {" "}
        ❮{" "}
      </button>{" "}
      <button className="next" onClick={nextSlide}>
        {" "}
        ❯{" "}
      </button>{" "}
    </div>
  );
};

export default Slide;

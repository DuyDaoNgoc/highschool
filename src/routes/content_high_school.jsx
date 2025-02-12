import React from "react";
import "../css/main.css";

const ContentHighSchool = ({ data }) => {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <div className="display_flex_asi-main">
        <aside className="aside_right">
          <div className="gap_aside_menu">
            <div>
              <button className="background_aside_menu">
                <p>Logic School Curiculum</p>
              </button>
            </div>
            <div>
              <button className="background_aside_menu ">
                <p>Rhetoric School Curriculum</p>
              </button>
            </div>
            <div>
              <button className="background_aside_menu ">
                <p>School Clubs</p>
              </button>
            </div>
            <div>
              <button className="background_aside_menu ">
                <p>Student Leadership</p>
              </button>
            </div>
          </div>
          <div className="Articles_high_school">
            <div className="title_Articles">
              <hr />
              <h1>Articles</h1>
              <p>upper school</p>
              <hr />
            </div>
            <div className="student_upper_school">
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img src="/images/student_song.jpg" alt="" />
                  <p>2023 Valedictory Address</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img src="/images/2022ValedictoryAddress.png" alt="" />
                  <p>2022 Valedictory Address</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img src="/images/2021ValedictoryAddress.jpg" alt="" />
                  <p>2021 Valedictory Address</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img
                    src="/images/Learning_How_to_Learn_The_Senior_Thesis.jpg"
                    alt=""
                  />
                  <p>Learning How to Learn: The Senior Thesis</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img src="/images/Why_Study_Rhetoric.jpg" alt="" />
                  <p>Why Study Rhetoric?</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img src="/images/knights-fest.jpg" alt="" />
                  <p>“You Teach Logic to Middle Schoolers???”</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img
                    src="/images/You_Teach_Logic_to_Middle_Schoolers.jpg"
                    alt=""
                  />
                  <p>What Is Knights’ Fest?</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img
                    src="/images/Exploring_God’s_Creation_in_Science_Class.jpg"
                    alt=""
                  />
                  <p>Exploring God’s Creation in Science Class</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img
                    src="/images/In_Challenging_Times_We_Need_the_Arts.jpg"
                    alt=""
                  />
                  <p>In Challenging Times, We Need the Arts</p>
                </button>
              </div>
              <div className="img_title_articles">
                <button className="btn_artiles">
                  <img src="/images/The_Senior_Service_Practicum.jpg" alt="" />

                  <p>The Senior Service Practicum</p>
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRedirect("/fine-arts")}
              className="link"
            >
              View More Articles from “The Forum”{" "}
            </button>
          </div>
        </aside>
        <main className="main_content">
          <article>
            <div className="title_content">
              <h1>Upper School</h1>
            </div>
            <p className="font_content">
              We welcome you to Van Lang School. Here in the Upper School,
              grades 6-12, students are busy contemplating important questions
              that direct them toward a better understanding and sharpening of
              their Christian worldview. We also work to help our students
              discern the alternative worldviews of the past and of the society
              they face today. As administrators and teachers, we strive to
              cultivate a desire for wisdom and godliness while working to
              nourish a spirit of inquiry and a love for learning.
            </p>
          </article>
          <article>
            <div className="title_content">
              <h1>Upper School Highlights</h1>
            </div>
            <ul>
              <li className="font_content">
                <p>
                  The classical subjects of Logic and Rhetoric are part of our
                  core curriculum.
                </p>
              </li>
              <li className="font_content">
                <p>
                  Literature and History classes progress chronologically
                  through the grades and are integrated to give proper context
                  and depth of understanding to these subjects.
                </p>
              </li>
              <li className="font_content">
                <p>
                  Emphasis on application, synthesis, and communication of
                  information.
                </p>
              </li>
              <li className="font_content">
                <p>
                  Students learn to articulate and defend their Christian
                  worldview in Theology and Apologetics classes.
                </p>
              </li>
              <li className="font_content">
                <p>
                  Award-winning{" "}
                  <button
                    onClick={() => handleRedirect("/fine-arts")}
                    className="link "
                  >
                    Fine Arts
                  </button>{" "}
                  program.
                </p>
              </li>
              <li className="font_content">
                <p>
                  <button
                    onClick={() => handleRedirect("/student-leadership")}
                    className="link "
                  >
                    Student Leadership
                  </button>{" "}
                  opportunities.
                </p>
              </li>
              <li className="font_content">
                <p>
                  <button
                    onClick={() => handleRedirect("/school-clubs")}
                    className="link "
                  >
                    School Clubs
                  </button>
                  .
                </p>
              </li>
              <li className="font_content">
                <p>
                  Seniors develop, present, and defend a{" "}
                  <button
                    onClick={() => handleRedirect("/thesis")}
                    className="link "
                  >
                    thesis.
                  </button>
                </p>
              </li>
            </ul>
          </article>
          <article>
            <div className="title_content">
              <h1>Video</h1>
              <video controls>
                <source src="./video/Review_highschool.mp4" type="video/mp4" />
                <track
                  kind="subtitles"
                  src="./subtitles_vi.vtt"
                  srcLang="vi"
                  label="Vietnamese"
                  default
                />
              </video>
              <div className="font_content">
                <p>☀️ THE DRUM ROLLS, VAN LANG TRANSFORMS</p>
                <p>
                  On December 22, 2022, the event "ANNOUNCEMENT OF VAN LANG
                  UNIVERSITY'S NEW BRAND IDENTITY" marked a transformation in
                  outward appearance, symbolizing a resounding drumbeat
                  signaling Van Lang's evolution in its core values.
                </p>
                <p>
                  The Van Lang community warmly welcomes this pivotal
                  transformation and is filled with hope to continue the journey
                  ahead.
                </p>
                <p>
                  To celebrate this historic milestone of Van Lang, we invite
                  our community of teachers, alumni, and students to join hands
                  in embracing the new brand identity with pride.
                </p>
              </div>
            </div>
          </article>
        </main>
      </div>

      <div className="ft_visit_our_campus">
        <div>
          <button
            onClick={() => handleRedirect("/thesis")}
            className="ft_content"
          >
            Visit our campus
          </button>
        </div>
        <div>
          <p>Interested in Learning More?</p>
        </div>
        <div>
          <button
            onClick={() => handleRedirect("/thesis")}
            className="ft_content"
          >
            Apply now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentHighSchool;

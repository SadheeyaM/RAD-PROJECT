import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
        We offer top-quality online courses designed to help you learn
         and grow in your chosen field, with practical lessons taught
          by experienced instructors
        </p>
      </div>


      <div className="lectures-section">
        <h3>Our Lectures</h3>
        <div className="lectures-cards">
          <div className="lecture-card">
            <img src="../../public/lecture1.jpg" alt="Lecture 1" />
            <div className="lecture-description">
              <h4>Subithan</h4>
              <p>Msc. Computer Science</p>
              <p>Lecturer at UCSC</p>
            </div>
          </div>
          <div className="lecture-card">
            <img src="../../public/lecture2.jpg" alt="Lecture 2" />
            <div className="lecture-description">
              <h4>Sadheeya</h4>
              <p>Msc. Computer Science</p>
              <p>Lecturer at UCSC</p>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default About;

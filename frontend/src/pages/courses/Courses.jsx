import React from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { courses } = CourseData();
  const navigate = useNavigate()

  console.log(courses);

  const handleRequestClick = () => {
    navigate("/requestCourse"); 
  };

  return (
    <div className="courses">
      <h2>Available Courses</h2>

      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Yet!</p>
        )}
      </div>
      <div className="request-course-section">
        <p>Can't Find The Courses You Want? Get The Course You Want!</p>
        <button
          className="request-button"
          onClick={handleRequestClick}
        >
          Request Now
        </button>
      </div>
    </div>
  );
};

export default Courses;

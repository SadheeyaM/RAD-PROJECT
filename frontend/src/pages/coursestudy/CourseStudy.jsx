import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    navigate("/");
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

 

   return (
    <>
      {course && (
        <div className="course-study-page">
         
          <div className="course-header">
            <div className="course-image-container">
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                className="course-image"
              />
            </div>
            <div className="course-details">
              <h2>{course.title}</h2>
              <h4>Instructor - {course.createdBy}</h4>
              <h4>Duration - {course.duration} weeks</h4>
              <Link to={`/lectures/${course._id}`} className="course-link">
                <b>Lectures</b>
              </Link>
            </div>
          </div>

          
          <div className="course-description">
            <h3>Description</h3>
            <p>
            <h4>{course.description}</h4>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;

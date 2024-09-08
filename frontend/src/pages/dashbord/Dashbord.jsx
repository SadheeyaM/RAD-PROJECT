import React, { useEffect } from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import CourseCard from "../../components/coursecard/CourseCard";
import CourseRequestCard from "../../components/courseRequestCard/courseRequestsCard"; 

const Dashbord = () => {
  const { mycourse } = CourseData();
  const { fetchMyRequests, requests, fetchMyFeedbacks, feedbacks } = UserData();

  useEffect(() => {
    fetchMyRequests();
    fetchMyFeedbacks();
  }, []);

  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p>No course Enrolled Yet</p>
        )}
      </div>

      <h2>My Course Requests</h2>
      <div className="dashboard-content">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <CourseRequestCard key={request._id} request={request} />
          ))
        ) : (
          <p>No course requests made yet</p>
        )}
      </div>

      <h2>My Feedbacks</h2>
      <div className="dashboard-content">
        {feedbacks && feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div key={feedback._id} className="feedback-card">
              <h4>Course: {feedback.courseTitle}</h4>
              <p>{feedback.comment}</p>
              <p>Rating: {feedback.rating}</p>
            </div>
          ))
        ) : (
          <p>No feedbacks given yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashbord;

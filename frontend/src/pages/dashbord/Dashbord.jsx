


import React, { useEffect, useState } from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import CourseCard from "../../components/coursecard/CourseCard";
import CourseRequestCard from "../../components/courseRequestCard/courseRequestsCard"; 

const Dashboard = () => {
  const { mycourse } = CourseData();
  const { fetchMyRequests, requests } = UserData();
  const [activeSection, setActiveSection] = useState("courses");

  useEffect(() => {
    fetchMyRequests();
  }, []);

  return (
    <div className="student-dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => setActiveSection("courses")} className={activeSection === "courses" ? "active" : ""}>
            Courses
          </li>
          <li onClick={() => setActiveSection("requests")} className={activeSection === "requests" ? "active" : ""}>
            Requests
          </li>
        </ul>
      </div>
      
      <div className="content">
        {activeSection === "courses" && (
          <>
            <h2>All Enrolled Courses</h2>
            <div className="dashboard-content">
              {mycourse && mycourse.length > 0 ? (
                mycourse.map((course) => <CourseCard key={course._id} course={course} />)
              ) : (
                <p>No course Enrolled Yet</p>
              )}
            </div>
          </>
        )}

        {activeSection === "requests" && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

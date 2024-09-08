import React, { useState } from "react";
import "./courseRequestsCard.css";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";

const CourseRequestCard = ({ request }) => {
  const navigate = useNavigate();
  const { fetchCourses } = CourseData();
  const { user } = UserData();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(request.title);
  const [updatedDescription, setUpdatedDescription] = useState(request.description);

  const approveHandler = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/admin/approveCourseRequest/${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course request?")) {
      try {
        const { data } = await axios.delete(
          `${server}/api/user/deleteCourseRequest/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  };

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/api/user/requestCourse/${id}`,
        { title: updatedTitle, description: updatedDescription },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setIsEditing(false);
      fetchCourses(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update request");
    }
  };

  return (
    <div className="course-request-card">
      <div className="card-header">
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </>
        ) : (
          <h3 className="card-title">{request.title}</h3>
        )}
        <p className="card-status">Status: {request.status}</p>
      </div>
      {isEditing ? (
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      ) : (
        <p className="card-description">{request.description}</p>
      )}
      <p className="card-requested-by">Requested by: {request.requestedBy}</p>

      {user && user.role === "admin" && (
        <div className="card-actions">
          <button
            onClick={() => approveHandler(request._id)}
            className="common-btn approve-btn"
          >
            Approve
          </button>
        </div>
      )}

      {user && user.role === "user" && user._id === request.requestedBy && request.status === "pending" && (
        <div className="card-actions">
          {isEditing ? (
            <>
              <button
                onClick={() => updateHandler(request._id)}
                className="common-btn update-btn"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="common-btn cancel-btn"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="common-btn edit-btn"
            >
              Edit Request
            </button>
          )}
          <button
            onClick={() => deleteHandler(request._id)}
            className="common-btn delete-btn"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseRequestCard;

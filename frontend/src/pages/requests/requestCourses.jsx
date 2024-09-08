import React, { useState } from "react";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import "./requestCourses.css";

const RequestCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/api/user/requestCourse`,
        { title, description },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    }
  };

  return (
    <div className="request-course">
      <h2>Request a New Course</h2>
      <form onSubmit={handleSubmit} className="request-course-form">
        <div className="form-group">
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Course Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestCourse;
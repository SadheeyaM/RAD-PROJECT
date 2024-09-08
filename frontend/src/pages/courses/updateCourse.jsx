import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";
import "./UpdateCourse.css";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    content: "",
    duration: "",
    price: "",
  });
  const [image, setImage] = useState(null); // Separate state for image

  // Fetch existing course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  // Handle changes to form fields (text inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection for image input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logging to check if the submit function is triggered
    console.log("Form submitted");

    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("content", course.content);
    formData.append("duration", course.duration);
    formData.append("price", course.price);

    if (image) {
      formData.append("image", image); // Attach image only if selected
      console.log("Image added to FormData:", image);
    } else {
      console.log("No image selected");
    }

    try {
      // Send the updated course data via API
      const response = await axios.put(`${server}/api/course/${id}`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      });

      console.log("API response:", response);
      alert(response.data.message);

      // Redirect to the course page after successful update
      navigate(`/course/${id}`);
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Error updating course. Please try again.");
    }
  };

  return (
    <div className="update-course-container">
      <h1>Update Course</h1>
      <form onSubmit={handleSubmit} className="update-course-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={course.content}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (weeks):</label>
          <input
            id="duration"
            type="number"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleImageChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;

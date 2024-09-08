import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";
import "./UpdateCourse.css"

const UpdateCourse = () => {
  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState("");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCourse(data.course);
      setTitle(data.course.title);
      setDescription(data.course.description);
      setDuration(data.course.duration)
      setPrice(data.course.price)
      setImagePrev(`${server}/${data.course.image}`);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch course details");
      setLoading(false);
    }
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file); 
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("duration", duration)
    myForm.append("price", price)

    if (image) {
      myForm.append("file", image);
    }

    try {
      const { data } = await axios.put(`${server}/api/course/${id}`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data", 
          token: localStorage.getItem("token"),
        },
      });
      toast.success("Course updated successfully");
      navigate("/courses"); 
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update course");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="update-course">
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit} className="update-course-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        </div>
        
        <div className="form-group">
        <label>Duration</label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        </div>
        
        <div className="form-group">
        <label>Duration</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        </div>
                
        <div className="form-group">
        <label>Upload Image</label>
        <input type="file" onChange={changeImageHandler} />

        {imagePrev && (
          <img src={imagePrev} alt="Course Preview" width={300} />
        )}
        </div>
        

        <button type="submit" disabled={btnLoading} className="submit-btn">
          {btnLoading ? "Updating..." : "Update Course"}
        </button>
        
      </form>
    </div>
  );
};

export default UpdateCourse;


import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_yOMeMyaj2wlvTt",
      amount: order.id, 
      currency: "INR",
      name: "E learning", 
      description: "Learn with us",
      order_id: order.id, 

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-study-page">
              <div className="course-header">
                <div className="course-image-container">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                </div>
                
                <div className="course-details">
                  <h2>{course.title}</h2>
                  <p>Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                  <br/>
                  <p>Let's get started with course At Rs. {course.price}</p>
                  
                  {user && user.subscription.includes(course._id) ? (
                      <button
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        className="common-btn"
                      >
                        Study
                      </button>
                    ) : (
                      <button onClick={() => navigate(`../../payment/${course._id}`)} className="common-btn">
                        Buy Now
                      </button>
                    )}
                </div>
              </div>

              

              <div className="course-description">
                <h3>Description</h3>
                <p>
                <h4>{course.description}</h4>
                
                </p>
                <p>{}</p>
              </div>

            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;

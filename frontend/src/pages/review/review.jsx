import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './review.css';
import { server } from "../../main";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";

const FeedbackPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = UserData(); 
    const [feedback, setFeedback] = useState('');
    const [feedbackStatus, setFeedbackStatus] = useState('');
    const [existingReview, setExistingReview] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const { data } = await axios.get(`${server}/api/review/getReview/${courseId}`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    }
                });

                if (data.review) {
                    setExistingReview(data.review);
                    setFeedback(data.review.feedback); 
                }
            } catch (error) {
                console.error("Error fetching review:", error);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchFeedback();
    }, [courseId]);

    const handleFeedback = async () => {
        try {
            const response = await axios.post(
                `${server}/api/review/new/${courseId}`,
                { msg: feedback },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            setFeedbackStatus(response.data.message);
            setExistingReview(response.data.review); 
        } catch (error) {
            setFeedbackStatus('Feedback failed. Please try again.');
        }
    };

    const updateHandler = async () => {
        try {
          console.log('Updating review:', existingReview._id, feedback); 
          const { data } = await axios.put(
            `${server}/api/review/updateReview/${existingReview._id}`,
            { feedback: feedback },
            {
              headers: {
                token: localStorage.getItem("token"),
              }
            }
          );
          console.log('Update response:', data); 
          toast.success(data.message);
          setFeedbackStatus('Review updated successfully');
        } catch (error) {
          console.error('Error updating review:', error); 
          toast.error("Failed to update review");
        }
      };

    const deleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                const { data } = await axios.delete(
                    `${server}/api/review/deleteReview/${existingReview._id}`,
                    {
                        headers: {
                            token: localStorage.getItem("token"),
                        }
                    }
                );
                toast.success(data.message);
                setExistingReview(null);
                setFeedback(''); 
                setFeedbackStatus('Review deleted successfully');
            } catch (error) {
                toast.error("Failed to delete review");
            }
        }
    };

    const handleGoToCourse = () => {
        navigate(`/course/study/${courseId}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="feedback-container">
            <h2>{existingReview ? "Edit Your Feedback" : "Submit Your Feedback"}</h2>

            {existingReview && (
                <div className="existing-review">
                    <h3>Your Review:</h3>
                    <p>{existingReview.feedback}</p> 
                </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Message</label>
                    <input
                        type="text"
                        className="form-control"
                        value={feedback} 
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Your Feedback"
                        required
                    />
                </div>

                {existingReview ? (
                    <>
                        <button
                            type="button"
                            className="btn"
                            onClick={updateHandler}
                        >
                            Update Review
                        </button>
                        <button
                            type="button"
                            className="btn delete-button"
                            onClick={deleteHandler}
                        >
                            Delete Review
                        </button>
                    </>
                ) : (
                    <button type="submit" className="btn" onClick={handleFeedback}>Submit</button>
                )}
            </form>

            {feedbackStatus && <p>{feedbackStatus}</p>}
            {feedbackStatus && feedbackStatus.toLowerCase().includes("successful") && (
                <button className="btn go-to-course-button" onClick={handleGoToCourse}>Go to Course</button>
            )}
        </div>
    );
};

export default FeedbackPage;
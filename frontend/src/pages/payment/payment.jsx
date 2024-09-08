import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './payment.css';

const PaymentPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const { courseId } = useParams();
    const navigate = useNavigate(); // Hook to handle navigation

    const handlePayment = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/payment/pay/${courseId}`,
                {
                    currency: 'LKR', // example currency
                    cardNumber,
                    expiryDate,
                    cvv,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                      },
                }
            );
            
            console.log('Payment Response:', response.data.message); // Log the message
            setPaymentStatus(response.data.message); // Set the status
        } catch (error) {
            console.error('Error:', error.response || error);
            setPaymentStatus('Payment failed. Please try again.');
        }
    };

    const handleGoToCourse = () => {
        navigate(`/course/study/${courseId}`);
    };

    return (
        <div className="payment-container">
            <h2>Make a Payment</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                        type="text"
                        className="form-control"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        required
                    />
                </div>
                <button type="submit" className="btn" onClick={handlePayment}>Pay Now</button>
            </form>
            {paymentStatus && <p>{paymentStatus}</p>}
            {paymentStatus && paymentStatus.toLowerCase().includes("successful") && (
                <button className="btn go-to-course-button" onClick={handleGoToCourse}>Go to Course</button>
            )}
        </div>
    );
};

export default PaymentPage;
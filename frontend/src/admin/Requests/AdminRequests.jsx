import React, { useEffect, useState } from "react";
import "./adminrequests.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import CourseRequestCard from "../../components/courseRequestCard/courseRequestsCard"; 

const AdminRequests = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [requests, setRequests] = useState([]);

  async function fetchRequests() {
    try {
      const { data } = await axios.get(`${server}/api/allrequests`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setRequests(data.requests);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Layout>
      <div className="requests">
        <h1>Customer Requests</h1>
        <div className="request-cards">
          {requests && requests.length > 0 ? (
            requests.map((request) => (
              <CourseRequestCard key={request._id} request={request} />
            ))
          ) : (
            <p className="no-requests">No requests available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminRequests;
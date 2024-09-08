

import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import "./account.css";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="profile">
      {user && (
        <>
          <div className="profile-info">
            <div className="profile-details">
              <p><strong>Name: {user.name}</strong></p>
              <p><strong>Email: {user.email}</strong></p>
            </div>
            <div className="dashboard-buttons">
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="account-btn"
              >
                <MdDashboard /> Dashboard
              </button>

              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="account-btn admin"
                >
                  <MdDashboard /> Admin Dashboard
                </button>
              )}

              <button
                onClick={logoutHandler}
                className="account-btn logout"
              >
                <IoMdLogOut /> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;

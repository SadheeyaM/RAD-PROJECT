import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminDashbord from "./admin/Dashboard/AdminDashbord";
import AdminUsers from "./admin/Users/AdminUsers";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Loading from "./components/loading/Loading";
import { UserData } from "./context/UserContext";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import Verify from "./pages/auth/Verify";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import Courses from "./pages/courses/Courses";
import UpdateCourse from "./pages/courses/UpdateCourse";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Dashbord from "./pages/dashbord/Dashbord";
import Home from "./pages/home/Home";
import Lecture from "./pages/lecture/Lecture";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import PaymentPage from "./pages/payment/payment";
import AdminRequests from "./admin/Requests/AdminRequests";
import RequestCourse from "./pages/requests/requestCourses";

const App = () => {
  const { isAuth, user, loading } = UserData();
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route
              path="/forgot"
              element={isAuth ? <Home /> : <ForgotPassword />}
            />
            <Route
              path="/reset-password/:token"
              element={isAuth ? <Home /> : <ResetPassword />}
            />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashbord user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashbord user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
            <Route
              path="/admin/requests"
              element={isAuth ? <AdminRequests user={user} /> : <Login />}
            />            
            <Route
              path="/course/update/:id"
              element={isAuth ? <UpdateCourse /> : <Login />}
            />
            <Route
              path='/requestCourse'
              element={isAuth ? <RequestCourse/> : <Login />}
            />
            <Route path="/payment/:courseId" element={<PaymentPage/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
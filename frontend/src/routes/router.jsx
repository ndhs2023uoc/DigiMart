import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashBoardLayout from "../layout/DashBoardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import SelectedClass from "../pages/Dashboard/Students/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Students/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Students/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Students/Payment/Payment";
import StudentCp from "../pages/Dashboard/Students/StudentCp";
import InstructorCp from "../pages/Dashboard/Instructor/InstructorCp";
import AddClasses from "../pages/Dashboard/Instructor/AddClasses";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import PendingCourse from "../pages/Dashboard/Instructor/PendingCourse";
import MyApprovedCourse from "../pages/Dashboard/Instructor/MyApprovedCourse";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import EnrolledClasses from "../pages/Dashboard/Students/Enroll/EnrolledClasses";
import EditClass from "../pages/Dashboard/Instructor/EditClass";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import UpdateProfile from "../pages/UpdateProfile";
import ManageApplications from "../pages/Dashboard/Admin/ManageApplications";
import GetClassDetail from "../pages/Dashboard/Instructor/GetClassDetails";
import EnrolledCLass from "../pages/Dashboard/Students/Enroll/EnrolledCLass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout>Hello world!</MainLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // {
      //   path: "/update-profile",
      //   element: <UpdateProfile />,
      // },
      {
        path: "/class/:id",
        element: <SingleClass />,
        loader: ({ params }) =>
          fetch(`http://localhost:3001/class/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "update-profile",
        element: <UpdateProfile />,
      },

      // {/*stdent routes */}
      {
        path: "student-cp",
        element: <StudentCp />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses />,
      },
      {
        path: "enrolled-class/:classId",
        element: <EnrolledCLass />,
      },
      {
        path: "my-selected",
        element: <SelectedClass />,
      },
      {
        path: "my-payment",
        element: <MyPaymentHistory />,
      },
      {
        path: "apply-instructor",
        element: <AsInstructor />,
      },
      {
        path: "user/payment",
        element: <Payment />,
      },
      //instructor routes
      {
        path: "instructor-cp",
        element: <InstructorCp />,
      },
      {
        path: "add-class",
        element: <AddClasses />,
      },
      {
        path: "edit-class/:id",
        element: <EditClass />,
      },
      {
        path: "view-class/:id",
        element: <GetClassDetail />,
      },
      {
        path: "my-classes",
        element: <MyClasses />,
      },
      {
        path: "my-pending",
        element: <PendingCourse />,
      },
      {
        path: "my-approved",
        element: <MyApprovedCourse />,
      },
      // admin routes
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "manage-classes",
        element: <ManageClasses />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-applications",
        element: <ManageApplications />,
      },
    ],
  },
]);

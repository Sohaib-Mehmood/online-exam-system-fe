import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/shared/Navbar";
import LoginForm from "./components/shared/LoginForm";
import SignupForm from "./components/shared/SignupForm";
import ProtectedWrapper from "./components/shared/ProtectedWrapper";

import AdminDashboard from "./components/admin/AdminDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import StudentDashboard from "./components/student/StudentDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route path="/admin" element={<ProtectedWrapper />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="/teacher" element={<ProtectedWrapper />}>
          <Route index element={<TeacherDashboard />} />
        </Route>
        <Route path="/student" element={<ProtectedWrapper />}>
          <Route index element={<StudentDashboard />} />
        </Route>
        <Route
          path="/"
          element={<div>Welcome to the Online Exam Portal</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;

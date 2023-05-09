import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import CreateUser from "./CreateUser";
import ApproveExam from "./ApproveExam";
import CancelExam from "./CancelExam";
import ReviewExamOutcomes from "./ReviewExamOutcomes";

const AdminDashboard = () => {
  const [exams, setExams] = useState([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showApproveExam, setShowApproveExam] = useState(false);
  const [showCancelExam, setShowCancelExam] = useState(false);
  const [showReviewExamOutcomes, setShowReviewExamOutcomes] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("/api/admin/exams");
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const toggleCreateUser = () => {
    setShowCreateUser(!showCreateUser);
  };

  const toggleApproveExam = () => {
    setShowApproveExam(!showApproveExam);
  };

  const toggleCancelExam = () => {
    setShowCancelExam(!showCancelExam);
  };

  const toggleReviewExamOutcomes = () => {
    setShowReviewExamOutcomes(!showReviewExamOutcomes);
  };

  const refreshExams = () => {
    fetchExams();
    toggleApproveExam();
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <Button onClick={toggleCreateUser}>Create User</Button>
      <Button onClick={toggleApproveExam}>Approve Exams</Button>
      <Button onClick={toggleCancelExam}>Cancel Exam</Button>
      <Button onClick={toggleReviewExamOutcomes}>Review Exam Outcomes</Button>
      {showCreateUser && <CreateUser onClose={toggleCreateUser} />}
      {showApproveExam && <ApproveExam onClose={refreshExams} />}
      {showCancelExam && <CancelExam onClose={toggleCancelExam} />}
      {showReviewExamOutcomes && (
        <ReviewExamOutcomes onClose={toggleReviewExamOutcomes} />
      )}
      <h2>Pending Exams</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Exam ID</th>
            <th>Title</th>
            <th>Teacher</th>
            <th>Subject</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam._id}</td>
              <td>{exam.title}</td>
              <td>{exam.teacher.name}</td>
              <td>{exam.subject}</td>
              <td>{new Date(exam.startDate).toLocaleDateString()}</td>
              <td>{new Date(exam.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;

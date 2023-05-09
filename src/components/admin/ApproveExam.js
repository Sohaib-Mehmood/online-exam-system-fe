import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";

const ApproveExam = ({ onClose }) => {
  const [pendingExams, setPendingExams] = useState([]);

  useEffect(() => {
    fetchPendingExams();
  }, []);

  const fetchPendingExams = async () => {
    try {
      const response = await axios.get("/api/admin/pending-exams");
      setPendingExams(response.data);
    } catch (error) {
      console.error("Error fetching pending exams:", error);
    }
  };

  const approveExam = async (examId) => {
    try {
      await axios.patch(`/api/admin/approve-exam/${examId}`);
      fetchPendingExams();
    } catch (error) {
      console.error("Error approving exam:", error);
    }
  };

  return (
    <Container>
      <h2>Approve Exams</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Exam ID</th>
            <th>Title</th>
            <th>Teacher</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingExams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam._id}</td>
              <td>{exam.title}</td>
              <td>{exam.teacher.name}</td>
              <td>{exam.subject}</td>
              <td>
                <Button variant="success" onClick={() => approveExam(exam._id)}>
                  Approve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Container>
  );
};

export default ApproveExam;

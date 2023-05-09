import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";

const CancelExam = ({ onClose }) => {
  const [approvedExams, setApprovedExams] = useState([]);

  useEffect(() => {
    fetchApprovedExams();
  }, []);

  const fetchApprovedExams = async () => {
    try {
      const response = await axios.get("/api/admin/approved-exams");
      setApprovedExams(response.data);
    } catch (error) {
      console.error("Error fetching approved exams:", error);
    }
  };

  const cancelExam = async (examId) => {
    try {
      await axios.patch(`/api/admin/cancel-exam/${examId}`);
      fetchApprovedExams();
    } catch (error) {
      console.error("Error canceling exam:", error);
    }
  };

  return (
    <Container>
      <h2>Cancel Exams</h2>
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
          {approvedExams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam._id}</td>
              <td>{exam.title}</td>
              <td>{exam.teacher.name}</td>
              <td>{exam.subject}</td>
              <td>
                <Button variant="danger" onClick={() => cancelExam(exam._id)}>
                  Cancel
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

export default CancelExam;

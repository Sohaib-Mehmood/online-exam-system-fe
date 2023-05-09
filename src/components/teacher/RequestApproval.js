import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "../../utils/api";

const RequestApproval = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("/teacher/exams");
        setExams(response.data.exams);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExams();
  }, []);

  const handleRequestApproval = async (examId) => {
    try {
      await axios.post(`/teacher/exam/${examId}/request-approval`);
      alert("Approval request sent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Request Approval</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam.title}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleRequestApproval(exam._id)}
                >
                  Request Approval
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RequestApproval;

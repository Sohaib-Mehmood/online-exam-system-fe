import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";

const ReviewExamOutcomes = ({ onClose }) => {
  const [examOutcomes, setExamOutcomes] = useState([]);

  useEffect(() => {
    fetchExamOutcomes();
  }, []);

  const fetchExamOutcomes = async () => {
    try {
      const response = await axios.get("/api/admin/exam-outcomes");
      setExamOutcomes(response.data);
    } catch (error) {
      console.error("Error fetching exam outcomes:", error);
    }
  };

  return (
    <Container>
      <h2>Review Exam Outcomes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Exam ID</th>
            <th>Title</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {examOutcomes.map((outcome) => (
            <tr key={`${outcome.exam._id}-${outcome.student._id}`}>
              <td>{outcome.exam._id}</td>
              <td>{outcome.exam.title}</td>
              <td>{outcome.student.name}</td>
              <td>{outcome.student.email}</td>
              <td>{outcome.score}</td>
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

export default ReviewExamOutcomes;

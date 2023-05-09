import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "../../utils/api";

const EditExam = ({ match }) => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axios.get(`/teacher/exam/${match.params.id}`);
        setFormData(response.data.exam);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExam();
  }, [match.params.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/teacher/update-exam/${match.params.id}`,
        formData
      );
      alert("Exam updated successfully");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Edit Exam</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Update Exam</Button>
      </Form>
    </Container>
  );
};

export default EditExam;

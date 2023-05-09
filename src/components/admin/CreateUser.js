import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

const CreateUser = ({ onClose }) => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/create-user", formData);
      setFormData({ role: "", name: "", email: "", password: "" });
      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Container>
      <h2>Create User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Create User</Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Form>
    </Container>
  );
};

export default CreateUser;

import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "../../utils/api";

const RemoveQuestion = ({ match }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `/teacher/exam/${match.params.id}/questions`
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, [match.params.id]);

  const handleRemove = async (questionId) => {
    try {
      await axios.delete(
        `/teacher/exam/${match.params.id}/question/${questionId}`
      );
      setQuestions(questions.filter((q) => q._id !== questionId));
      alert("Question removed successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Remove Questions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Question</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.text}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(question._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RemoveQuestion;

import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDelete = () => onDeleteQuestion(id);

  const handleAnswerChange = (e) => {
    onUpdateQuestion(id, { correctIndex: parseInt(e.target.value, 10) });
  };

  return (
    <li>
      <h4>{prompt}</h4>
      <select value={correctIndex} onChange={handleAnswerChange}>
        {answers.map((answer, index) => (
          <option key={index} value={index}>{answer}</option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default QuestionItem;

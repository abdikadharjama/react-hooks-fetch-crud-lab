import React, { useState } from 'react';

function NewQuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  const handleChange = (e) => {
    if (e.target.name === "answers") {
      const updatedAnswers = [...formData.answers];
      updatedAnswers[e.target.dataset.index] = e.target.value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddQuestion(formData);
    setFormData({ prompt: '', answers: ['', '', '', ''], correctIndex: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Prompt</label>
        <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />
      </div>
      {formData.answers.map((answer, index) => (
        <div key={index}>
          <label>Answer {index + 1}</label>
          <input type="text" name="answers" data-index={index} value={answer} onChange={handleChange} />
        </div>
      ))}
      <div>
        <label>Correct Answer Index</label>
        <input type="number" name="correctIndex" value={formData.correctIndex} onChange={handleChange} />
      </div>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;

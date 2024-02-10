import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import NewQuestionForm from './NewQuestionForm';
import AdminNavBar from './AdminNavBar';

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState('List');

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  const addQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
    .then(res => res.json())
    .then(data => setQuestions(prev => [...prev, data]));
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: 'DELETE' })
    .then(() => setQuestions(prev => prev.filter(question => question.id !== id)));
  };

  const updateQuestion = (id, updatedData) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    .then(res => res.json())
    .then(data => setQuestions(prev => prev.map(question => question.id === id ? data : question)));
  };

  return (
    <div>
      <AdminNavBar onChangePage={setPage} />
      {page === 'List' ? (
        <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} onUpdateQuestion={updateQuestion} />
      ) : (
        <NewQuestionForm onAddQuestion={addQuestion} />
      )}
    </div>
  );
}

export default App;

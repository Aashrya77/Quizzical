import React from 'react'
import './FirstPage.css'
import { useNavigate } from 'react-router-dom'

const FirstPage = () => {
    const navigate = useNavigate();
  return (
    <div className="Start">
      <h1>Quizzical</h1>
      <button onClick={() => navigate('/quiz')}>Start Quiz</button>
    </div>
  )
}

export default FirstPage;
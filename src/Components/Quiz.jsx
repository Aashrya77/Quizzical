import React, { useEffect, useState } from "react";
import "./Quiz.css";
import uuid from "react-uuid";

const url = "http://localhost:3000/data";

const Quiz = () => {
  const [loading, setLoading] = useState(true);
  const [quizes, setQuizes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(url);
      const quize = await response.json();
      const shuffledData = shuffleArray(quize);
      setLoading(false);
      setQuizes(shuffledData);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleAnswerSelection = (questionId, selectedAnswer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  if (loading) {
    return (
      <section>
        <div className="custom-loader"></div>
      </section>
    );
  }

  return (
    <div className="quiz-container">
      <ul>
        {quizes.map((quiz) => {
          const { question, correct_answer, answer, id } = quiz;
          const isCorrect = selectedAnswers[id] === correct_answer;
          const isIncorrect = selectedAnswers[id] && !isCorrect;
  
          return (
            <li key={id}>
              <div className="quizes">
                <div className="question">
                  <p>{question}</p>
                </div>
                <div className="answers">
                  {answer.map((ans, ansIndex) => {
                    return (
                      <div
                        key={ansIndex}
                        onClick={() => handleAnswerSelection(id, ans)}
                        className={`${
                          selectedAnswers[id] === ans
                            ? isCorrect
                              ? "selected-correct"
                              : isIncorrect && showResults
                              ? "selected-incorrect"
                              : "selected"
                            : "not-selected"
                        }`}
                      >
                        {ans}
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="check">
        {showResults && (
          <p>
            You Scored:{" "}
            {quizes.reduce((score, quiz) => {
              const { correct_answer, id } = quiz;
              return selectedAnswers[id] === correct_answer ? score + 1 : score;
            }, 0)}{" "}
            out of {quizes.length}
          </p>
        )}
        <button onClick={checkAnswers}>Check Answers</button>
      </div>
    </div>
  );
  
  
};

export default Quiz;
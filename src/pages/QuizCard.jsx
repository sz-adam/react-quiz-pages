import React, { useContext, useState } from 'react';
import '../styles/QuizCard.css';
import { NameContext } from '../context/NameContext';

export default function QuizCard({listen}) {
    const { nickName} = useContext(NameContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [show, setShow] = useState(false);
  
// question treatment
const handleNextQuestion = () => {
    if (currentIndex < listen.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShow(false);
    }
  };

  //  answer treatment
  const handleAnswerClick = selectedAnswer => {
    if (selectedAnswer === listen[currentIndex].correct_answer) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }

    setSelectedAnswer(selectedAnswer);

    if (currentIndex === listen.length - 1) {
      setShow(true);
    } else {
      setTimeout(handleNextQuestion, 1000);
    }
  };


  // restart
  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrect(0);
    setIncorrect(0);
    setSelectedAnswer(null);
    setShow(false);

  };

  return (
    <div className="quizcard-container">
      {show ? (
        <div className="quizcardshow">
          <p>{nickName} your achievement</p>
          <p>Correct answers: {correct}</p>
          <p>Incorrect answers: {incorrect}</p>
          <button className="showRestart" onClick={handleRestart}>
            Restart
          </button>
        </div>
      ) : (
        <div className="quizcard">
          {listen[currentIndex] && (
            <div className="quizcard">
              <div className="quizquestion">
                <p>Category: {listen[currentIndex].category}</p>
                <p dangerouslySetInnerHTML={{ __html: listen[currentIndex].question }}></p>
              </div>
              <div className="quizcard-answer">
                {listen[currentIndex].options.map((answer, index) => (
                  <p
                    className={`answers ${selectedAnswer === answer
                        ? answer === listen[currentIndex].correct_answer
                          ? 'correct'
                          : 'incorrect'
                        : ''
                      }`}
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  ></p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

import React, { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from "../../components/button";
import MyImage1 from '../../image/11.png';
import MyImage2 from '../../image/12.png';
import MyImage3 from '../../image/13.png';
import MyImage4 from '../../image/14.png';
import MyImage5 from '../../image/15.png';
import MyImage6 from '../../image/16.png';
import MyImage7 from '../../image/17.png';
import MyImage8 from '../../image/18.png';

const QuesionUI = ({ questions , testType }) => {
  const { userTestId } = useParams();
  const navigate = useNavigate();
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOptionClick = useCallback((index) => {
    const updatedSelection = [...selectedIndex];
    updatedSelection[currentQuestion] = index;
    setSelectedIndex(updatedSelection);
    setIsAnswerSelected(true);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswerSelected(false);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestion, selectedIndex, questions.length]);

  const handleSubmit = useCallback(async () => {
    if (!userTestId) {
      console.error('User test ID not found');
      return;
    }

    setLoading(true);

    const results = {
      answers: selectedIndex,
      totalQuestions: questions.length,
    };

    localStorage.setItem('userTestId', userTestId);
    localStorage.setItem('quizResults', JSON.stringify(results));

    const answers = questions.map((question, index) => ({
      question_id: index + 1,
      answer_choice_id: selectedIndex[index] + 1,
    }));

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'APP_KEY': APP_KEY,
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL_SERVER}quiz/submit`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ user_test_id: userTestId, answers }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      localStorage.setItem('testResults', JSON.stringify(data));

      if (testType === 'major') {
        navigate('/major_test/view_result', {
          state: {
            results: data,
            answersSelected: selectedIndex,
          },
        });
      } else if (testType === 'personal') {
        navigate('/personal_test/view_result', {
          state: {
            results: data,
            answersSelected: selectedIndex,
          },
        });
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setLoading(false);
    }
  }, [userTestId, selectedIndex, questions, APP_KEY, navigate , testType]);

  const handleBackToQuiz = useCallback(() => {
    setQuizCompleted(false);
    setCurrentQuestion(questions.length - 1);
    setIsAnswerSelected(selectedIndex[questions.length - 1] !== undefined);
  }, [questions.length, selectedIndex]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setIsAnswerSelected(selectedIndex[currentQuestion - 1] !== undefined);
    }
  }, [currentQuestion, selectedIndex]);

  const calculateProgress = useCallback((count, total) => {
    return (count / total) * 100;
  }, []);

  const firstAnswerCount = useMemo(() => selectedIndex.filter((index) => index === 0).length, [selectedIndex]);
  const secondAnswerCount = useMemo(() => selectedIndex.filter((index) => index === 1).length, [selectedIndex]);

  const images = useMemo(() => [
    MyImage1, MyImage2, MyImage3, MyImage4, MyImage5, MyImage6, MyImage7, MyImage8,
  ], []);

  const getCurrentImage = useCallback(() => {
    return images[currentQuestion % images.length];
  }, [currentQuestion, images]);

  return (
    <main className="flex flex-col max-w-8xl mx-auto sm573:px-[2rem]  px-[1rem]">
      <div className='mt-[1rem]'>
        <Button
          label="Go Back"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-4 mr-[5px] mt-[-1px]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Go Back
        </Button>
      </div>

      <div className="flex flex-col sm879:flex-row justify-between items-center mx-auto lgd:gap-[10rem] ">
        <section>
          <nav className="h-[14.5rem] sm375:h-[13rem] sm573:w-[30rem] sm425:w-[24.5rem] sm375:w-[21.5rem] w-[18rem] p-6 relative">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0 || quizCompleted}
                className={`p-2 rounded-full ${currentQuestion === 0 || quizCompleted ? "text-gray" : "text-pink"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="50%" cy="50%" r="30" fill="none" stroke="#e5e7eb" strokeWidth="7" />
                  <circle cx="50%" cy="50%" r="30" fill="none" className="stroke-pink" strokeWidth="7" strokeDasharray={2 * Math.PI * 30} strokeDashoffset={(2 * Math.PI * 30) * ((quizCompleted ? 0 : questions.length - currentQuestion) / questions.length)} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-logocolor font-bold text-xl">
                  {quizCompleted ? 0 : questions.length - currentQuestion}
                </div>
              </div>

              <button
                onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))}
                disabled={quizCompleted || currentQuestion === questions.length - 1 || !isAnswerSelected}
                className={`p-2 rounded-full ${quizCompleted || currentQuestion === questions.length - 1 || !isAnswerSelected ? "text-gray" : "text-pink"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <nav className="flex items-center space-x-2 px-2 mt-1 mb-3">
              <span className={`font-bold ${selectedIndex[currentQuestion] === 0 ? "text-logocolor" : "text-gray"}`}>
                {firstAnswerCount}
              </span>
              <div className="h-2 w-[100%] bg-white rounded-full relative">
                <div className="absolute top-0 left-0 h-2 bg-logocolor rounded-full" style={{ width: `${calculateProgress(firstAnswerCount, selectedIndex.length)}%` }} />
              </div>

              <div className="h-2 w-[100%] bg-white rounded-full relative">
                <div className="absolute top-0 right-0 h-2 bg-pink rounded-full" style={{ width: `${calculateProgress(secondAnswerCount, selectedIndex.length)}%` }} />
              </div>

              <span className={`font-bold ${selectedIndex[currentQuestion] === 1 ? "text-pink" : "text-gray"}`}>
                {secondAnswerCount}
              </span>
            </nav>

            <div className="text-center mb-4">
              <p className="text-gray text-sm m-[0.5rem]">
                Questions {currentQuestion + 1} / {questions.length}
              </p>

              {!quizCompleted ? (
                <h2 className="text-lg sm:text-xl font-semibold text-logocolor">
                  {questions[currentQuestion].question}
                </h2>
              ) : (
                <div className="text-center">
                  <p className="text-xl font-bold text-logocolor">
                    Congratulations!
                  </p>
                </div>
              )}
            </div>
          </nav>

          {!quizCompleted ? (
            <div className="space-y-4 mt-[2rem] sm573:w-[30rem] sm425:w-[24.5rem] sm375:w-[21.5rem] w-[18rem]">
              {questions[currentQuestion].answers.map((answer, i) => (
                <button
                key={i}
                className={`w-full py-3 px-4 rounded-lg text-left transition text-start
                  ${selectedIndex[currentQuestion] === i ? (i === 0 ? "text-logocolor" : "text-pink") : "text-black"} 
                  ${i === 0 ? "hover:text-logocolor" : "hover:text-pink"}`}
                onClick={() => handleOptionClick(i)}
              >
                <div className="flex justify-between items-start h-[1rem]">
                  <span>{answer}</span>
                  {selectedIndex[currentQuestion] === i && (
                    <svg className="w-5 h-5 text-gray-800 dark:text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7.293 1.707 1.707 7.293a1 1 0 0 0 0 1.414l5.586 5.586A1 1 0 0 0 9 13.586V2.414a1 1 0 0 0-1.707-.707Z" />
                    </svg>
                  )}
                </div>
              </button>
              
              ))}
            </div>
          ) : (
            <div className="text-center justify-center gap-2 ml-[1rem] flex flex-col w-[90%] h-[5.8rem]">
              <div className="text-center mt-[7rem]">
                <p className="text-xl font-bold text-logocolor">
                  You've completed the quiz!
                </p>
                <p className="text-sm text-gray">
                  Please click on Submit.
                </p>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <Button
                  label="Back to Answer"
                  onClick={handleBackToQuiz}
                  className="bg-logocolor hover:bg-gray"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`bg-pink hover:bg-gray ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>

              </div>
            </div>
          )}
        </section>

        {!quizCompleted ? (
          <section className="mt-[3rem]">
            <img
              src={getCurrentImage()}
              alt={`Question ${currentQuestion + 1}`}
              className="w-full max-w-md mx-auto"
            />
          </section>
        ) : (
          <section className="mt-3">
            <img
              src={MyImage4}
              alt="Completed"
              className="w-full max-w-md mx-auto"
            />
          </section>
        )}
      </div>
    </main>
  );
};

export default QuesionUI;
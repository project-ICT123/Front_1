import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import axios from "axios";
import QuestionUI from "./QuestionUI";

function Question() {
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { testType } = location.state || {};

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const token = localStorage.getItem("token");
        const APP_KEY = process.env.REACT_APP_APP_KEY;

        if (!token) {
          setError("No token found.");
          return;
        }

        // Check if data is cached in localStorage
        const cachedData = localStorage.getItem("cachedQuestionData");
        if (cachedData) {
          setQuestionData(JSON.parse(cachedData));
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_SERVER}getAnswerandQuestion`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              APP_KEY: APP_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const transformedData = response.data.map((item) => ({
          question: item.question_text,
          answers: item.answer_texts,
        }));

        // Cache the data in localStorage
        localStorage.setItem("cachedQuestionData", JSON.stringify(transformedData));

        setQuestionData(transformedData);
      } catch (err) {
        setError("Failed to fetch question data");
        console.error(err);
      } 
    };

    fetchQuestion();
  }, []);


  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  // Render QuestionUI only when questionData is not null
  return questionData ? <QuestionUI questions={questionData} testType={testType} /> : null;
}

export default React.memo(Question);

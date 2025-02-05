import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionUI from "../quiz_component/QuestionUI";

function QuestionMajor() {
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const token = localStorage.getItem("token");
        const APP_KEY = process.env.REACT_APP_APP_KEY;

        if (!token) {
          setError("No token found.");
          setLoading(false);
          return;
        }

        // Check if data is cached in localStorage
        const cachedData = localStorage.getItem("cachedQuestionData");
        if (cachedData) {
          setQuestionData(JSON.parse(cachedData));
          setLoading(false);
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
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading questions... Please wait for 70 questions.😊
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return <QuestionUI questions={questionData} />;
}

export default React.memo(QuestionMajor);
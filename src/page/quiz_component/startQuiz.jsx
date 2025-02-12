import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

function StartQuiz({ typeqcm, destination , testType }) {
  const navigate = useNavigate();
  const tokenRef = useRef(localStorage.getItem("token")); // Store token in a ref to avoid re-fetching on every render
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleStartQuiz = useCallback(async () => {
    if (!tokenRef.current) {
      // If no token, navigate to login with typeqcm state
      navigate("/login", { state: { typeqcm } });
      return;
    }

    setIsLoading(true); // Start loading animation

    try {
      const BASE_URL_SERVER = process.env.REACT_APP_BASE_URL_SERVER;
      const APP_KEY = process.env.REACT_APP_APP_KEY;

      console.log("Sending data:", { description_en: typeqcm });

      const response = await axios.post(
        `${BASE_URL_SERVER}addusertest`,
        { description_en: typeqcm },
        {
          headers: {
            "APP_KEY": APP_KEY,
            Authorization: `Bearer ${tokenRef.current}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.id) {
        // Redirect to the next page after successful response
        navigate(`${destination}/${encodeURIComponent(response.data.id)}`, {
          state: {
            testType: testType, // Pass testType in the navigation state
          },
        });
      } else {
        throw new Error("User test ID missing in response.");
      }
    } catch (error) {
      console.error("Error adding user test:", error.response || error);
      alert("Failed to start the quiz. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading animation after navigation or error
    }
  }, [navigate, destination, typeqcm , testType]);

  return (
    <main className="flex justify-center items-center p-6">
      <nav className="w-full max-w-4xl p-8 md:p-12 bg-white rounded-2xl shadow">
        <h1 className="text-center text-xl sm:text-xl font-semibold text-logocolor mb-6 sm:mb-8">
          &quot; There are a lot of 70 questions. Please take your time and don't rush
          to answer them &quot;
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray mb-3">
          As you answer the questions, DO NOT let your role and position at
          work/school or at home affect your choice. Your answer should reflect
          what you most feel is true to your personal preference and NOT what is
          expected of you.
        </p>
        <div className="flex justify-center items-center">
          {isLoading ? (
            <Button>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Loading...
            </Button>
          ) : (
            <Button label="Continue" onClick={handleStartQuiz}>
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          )}
        </div>
      </nav>
    </main>
  );
}

export default StartQuiz;

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Draggable from "react-draggable";
import Button from "../../components/button";
import Strengthsandweaknesses from "../quiz_component/strengthsandweaknesse";

function Moremajor() {
  const navigate = useNavigate();
  const dragStartPosition = useRef({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [careerData, setCareerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read test results and token once
  const testResults = useMemo(() => {
    return JSON.parse(localStorage.getItem("testResults"));
  }, []);

  const token = useMemo(() => {
    return localStorage.getItem("token");
  }, []);

  const personalityType = testResults?.personality_type || "N/A";

  useEffect(() => {
    if (!personalityType || personalityType === "N/A") {
      setError("No personality result found.");
      setLoading(false);
      return;
    }
    if (!token) {
      setError("Unauthorized: No token found.");
      setLoading(false);
      return;
    }

    const cachedData = JSON.parse(localStorage.getItem(`careerData_${personalityType}`));
    if (cachedData) {
      setCareerData(cachedData);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchCareerData = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL_SERVER}getCareer?personality_result=${personalityType}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            APP_KEY: process.env.REACT_APP_APP_KEY,
          },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (!data.career_descriptions || data.career_descriptions.length === 0) {
          setError("No career data found.");
        } else {
          setCareerData(data.career_descriptions);
          localStorage.setItem(`careerData_${personalityType}`, JSON.stringify(data.career_descriptions));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error fetching data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();

    return () => controller.abort();
  }, [personalityType, token]);

  const handleDragStart = (e, data) => {
    dragStartPosition.current = { x: data.x, y: data.y };
  };

  const handleDragStop = (e, data) => {
    const { x, y } = dragStartPosition.current;
    const distanceMoved = Math.sqrt((data.x - x) ** 2 + (data.y - y) ** 2);

    if (distanceMoved < 5) {
      handleOpenModal();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="sm573:px-8 px-3">
      <header className="relative">
        <div className="absolute md:top-[-1rem] top-[-6rem] left-[4px] md:left-0">
          <Button label="Go Back" onClick={() => navigate("/major_test/view_result/result")}>
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

        <div className="mt-[2rem]">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl md:mt-0 mt-[6rem] font-semibold text-logocolor md:mb-5 sm:mb-3">
            More Major That Fit You
          </h1>
          <p className="text-center text-sm sm:text-base md:text-lg text-gray">
            based on your Personality Types
          </p>
        </div>
      </header>

      <section className="mx-auto container">
        <nav className="p-5 bg-white rounded-2xl mt-[2rem] lgm:mt-[2.5rem] text-left">
          <p className="text-sm font-bold sm:text-base md:text-lg text-logocolor">
            Your Personality Type: <span className="text-pink font-bold">{personalityType}</span>
          </p>
        </nav>

        <nav className="mb-[2rem] p-5 bg-white rounded-2xl mt-[1rem] text-left">
          <p className="text-sm font-bold sm:text-base md:text-lg text-logocolor mb-3">Careers to Consider:</p>

          {loading ? (
            <p className="text-gray">Loading careers...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="list-disc list-inside text-gray text-sm sm:text-base md:text-lg sm425:grid grid-cols-2 lgm:grid-cols-3 lgs:grid-cols-4 lgl:grid-cols-5 gap-[8px]">
              {careerData.length > 0 ? (
                careerData.map((career, index) => <li key={index}>{career}</li>)
              ) : (
                <p>Career loading...</p>
              )}
            </ul>
          )}
        </nav>
      </section>

      <Draggable onStart={handleDragStart} onStop={handleDragStop}>
        <nav className="flex justify-end lgm:mt-[13.5rem] h-[5rem] fixed bottom-[2rem] right-[2rem] items-center justify-center z-50">
          <Button label="See More Major" onClick={handleOpenModal}>
            <div className="flex flex-row items-center justify-center sm879:w-[10rem]">
              Strengths and Weaknesses
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Button>
        </nav>
      </Draggable>

      {/* Modal - StartQuiz */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="p-[1rem] max-w-4xl flex relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-12 text-gray hover:text-pink absolute top-[-1.5rem] right-[-1rem] m-4 cursor-pointer"
              onClick={handleCloseModal}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
            <Strengthsandweaknesses />
          </div>
        </div>
      )}
    </main>
  );
}

export default Moremajor;
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import Strengthsandweaknesses from "../quiz_component/strengthsandweaknesse";


import Button from "../../components/button";
import TraitsList from "../../asset/TraitsList";

const Result = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dragStartPosition = useRef({ x: 0, y: 0 });

    // Retrieve data from location state or localStorage
    const storedResults = JSON.parse(localStorage.getItem("testResults")) || {};
    const results = location.state?.results || storedResults;
    
    const {
        personality_type = "INFP",
        description_en = "Default description",
        occupations_en = [],
        focuses_en = "Default focus",
    } = results;

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1500);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (results) {
            localStorage.setItem("testResults", JSON.stringify(results));
        }
    }, [results]);

    const handleDragStart = (e, data) => {
        dragStartPosition.current = { x: data.x, y: data.y };
        setIsDragging(true);
    };

    const handleDragStop = (e, data) => {
      const { x, y } = dragStartPosition.current;
      const distanceMoved = Math.sqrt((data.x - x) ** 2 + (data.y - y) ** 2);

      // If the user moved less than 5 pixels, consider it a click
      if (distanceMoved < 5 && !isDragging) {  // Open modal only if drag distance is small
        handleOpenModal();
      }

      setIsDragging(false); // User stopped dragging
      };

      const [isModalOpen, setIsModalOpen] = useState(false);
      

      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };


    return (
        <main className='sm573:px-8 sm573:p-4 px-4 mb-[2rem]'>
          <header>
            <Button
              label="Go Back"
              onClick={() => navigate('/major_test/view_result')}
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
          </header>
          <section className="mt-[2rem] text-left flex lgm:flex-row flex-col item-center justify-center lgm:gap-[2.5rem] gap-[2rem]">
            <nav>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-pink mb-3">
                RESULT
              </h1>
              <h1 className="sm425:block hidden text-xl sm:text-2xl md:text-3xl font-semibold text-logocolor sm879:mb-5">
                Personality type + Major Recommend
              </h1>
              <h1 className="sm425:hidden block text-xl sm:text-2xl md:text-3xl font-semibold text-logocolor ">
                Personality type <br/> + Major Recommend
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray mb-3">
                Discover your personality type and the majors that suit you best.
              </p>
              <div className="mt-[2rem] lgl:py-[4.5rem] py-[1.9rem] lgm:w-[30rem] lgl:w-[40rem] bg-white rounded-2xl">
                <TraitsList  />
              </div>
            </nav>
            <nav className="flex flex-col">
              <div className="p-5 bg-white rounded-2xl lgm:mt-[2rem] max-w-7xl">
                <p className="text-sm font-bold sm:text-base md:text-lg text-logocolor mb-3">
                  Your Personality Type : <span className="text-pink "> {personality_type} </span>
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray mb-3">
                  {description_en}
                </p>
              </div>
              <div className="flex flex-col lgm:flex-row gap-[2rem]">
              <Draggable onStart={handleDragStart} onStop={handleDragStop}>
                <nav className="flex justify-end lgm:mt-[13.5rem] h-[5rem] fixed bottom-[2rem] right-[2rem] items-center justify-center z-50">
                  <Button label="See More Major" onClick={handleOpenModal}>
                    <div className="flex flex-row items-center justify-center sm879:w-[15rem]">
                      Strengths and Weaknesses
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </Button>
                </nav>
              </Draggable>

                {/* Modal - Strengths and Weaknesses */}
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
              </div>
            </nav>
          </section>
        </main>
    );
};

export default Result;
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

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
      if (distanceMoved < 5) {
          navigate('/major_test/view_result/result/more_major_that_fit_you'); // Navigate only if the user didn't drag
      }

      setIsDragging(false); // User stopped dragging
      };

      const handleClick = () => {
          if (!isSmallScreen) {
              navigate('/major_test/view_result/result/more_major_that_fit_you');
          }
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
                <TraitsList />
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
                <nav className="p-5 bg-white rounded-2xl mt-[2rem] lgm:mt-[2.5rem] max-w-5xl">
                  <p className="text-sm font-bold sm:text-base md:text-lg text-logocolor mb-2">
                    Occupation/Major Trend :
                  </p>
                  <ul className="list-disc list-inside text-gray text-sm sm:text-base md:text-lg">
                    {occupations_en.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-bold sm:text-base md:text-lg text-logocolor sm425:mt-5">
                    Focus : <span className="text-gray font-normal">{focuses_en}</span>
                  </p>
                </nav>
                <Draggable disabled={!isSmallScreen} onStart={handleDragStart} onStop={handleDragStop}>
                  <nav className="flex justify-end lgm:mt-[11.8rem] h-[4rem] fixed lgs:static bottom-[2rem] right-[2rem]">
                    <Button label="See More Major" onClick={handleClick}>
                      See more majors that fit you
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                      </svg>
                    </Button>
                  </nav>
                </Draggable>
              </div>
            </nav>
          </section>
        </main>
    );
};

export default Result;
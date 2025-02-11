import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Button from '../../components/button';

const OccupationTrend = ({
    occupations_en,
    focuses_en,
    handleClick,
    isSmallScreen,
    handleDragStart,
    handleDragStop,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [hasClicked, setHasClicked] = useState(false); // Added this state for hasClicked

    const handleDragStartInternal = (e, data) => {
        setIsDragging(true);
        handleDragStart(e, data);
    };

    const handleDragStopInternal = (e, data) => {
        setIsDragging(false);
        handleDragStop(e, data);
    };

    return (
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

            <Draggable
                disabled={!isSmallScreen}
                onStart={handleDragStartInternal} // Use internal methods if necessary
                onStop={handleDragStopInternal}
            >
                <nav className="flex justify-end lgm:mt-[11.8rem] h-[4rem] fixed lgs:static bottom-[2rem] right-[2rem]">
                    <Button
                        label="See More Major"
                        onMouseDown={handleMouseDown}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isDragging && !hasClicked) {
                                handleClick();
                                setHasClicked(true);
                            }
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        See more majors that fit you
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Button>
                </nav>
            </Draggable>
        </div>
    );
};

export default OccupationTrend;

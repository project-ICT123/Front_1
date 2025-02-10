import React, { useState, useEffect, useRef } from 'react';

const TraitsList = ({ traitsData = [] }) => {
  const [selectedTrait, setSelectedTrait] = useState(null);
  const panelRef = useRef(null); // Reference to the details panel
  const listRef = useRef(null);  // Reference to the trait list

  // Close the details panel if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && !listRef.current.contains(event.target)) {
        setSelectedTrait(null); // Close the panel when clicking outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-start w-full relative">
      <nav className="flex items-center justify-center w-full">
        <ul ref={listRef} className="grid grid-cols-2 sm879:grid-cols-4 sm573:grid-cols-3 lgm:grid-cols-2 lgl:grid-cols-3 gap-y-[1.85rem] sm375:gap-x-[2rem] px-4">
          {traitsData.map((trait, index) => (
            <li key={index} className="flex items-center justify-start">
              <span
                onClick={() => setSelectedTrait(trait)}
                className={`w-8 h-8 ${trait.bgColor} text-white rounded-full flex items-center justify-center mr-2 font-bold text-sm sm:text-base md:text-lg cursor-pointer`}
              >
                {trait.initial}
              </span>
              <span
                onClick={() => setSelectedTrait(trait)} // Make the name clickable too
                className="text-gray text-sm sm:text-base md:text-lg cursor-pointer"
              >
                {trait.name}
              </span>

              {/* Conditionally render the details panel */}
              {selectedTrait === trait && (
                <div
                  ref={panelRef}
                  className="absolute bg-white shadow p-4 mt-2 rounded-lg w-72 left-1/2 transform -translate-x-1/2"
                >
                  <h3 className="font-semibold text-logocolor">{trait.name}</h3>
                  <p className="text-sm text-gray">{trait.details}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TraitsList;

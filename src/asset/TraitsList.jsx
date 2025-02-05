import React from 'react';

const TraitsList = ({ traitsData = [] }) => {
  return (
    <div className="flex justify-center items-start w-full">
      <nav className="flex items-center justify-center w-full">
        <ul className="grid grid-cols-2 sm879:grid-cols-4 sm573:grid-cols-3 lgm:grid-cols-2 lgl:grid-cols-3 gap-y-[1.85rem] sm375:gap-x-[2rem] px-4">
          {traitsData.map((trait, index) => (
            <li key={index} className="flex items-center justify-start">
              <span className={`w-8 h-8 ${trait.bgColor} text-white rounded-full flex items-center justify-center mr-2 font-bold text-sm sm:text-base md:text-lg`}>
                {trait.initial}
              </span>
              <span className="text-gray text-sm sm:text-base md:text-lg">{trait.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TraitsList;
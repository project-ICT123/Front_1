import React from 'react';

const table = ({  title , description  }) => {
  return (
    <div
      className="bg-white shadow p-8 text-left lg:h-[250px] sm:h-[200px] h-[150px] rounded-2xl "
    >

        <h3 className=" h-[3rem] text-logocolor font-semibold text-base sm:text-xl ">
          {title}
        </h3>
        <div className="flex flex-col items-center mt-4">
          {description.map((desc, index) => (
            <span
              key={index}
              className="text-lg text-gray-700 mb-2"
            >
              {desc}
            </span>
          ))}
        </div>

    </div>
  );
};

export default table;


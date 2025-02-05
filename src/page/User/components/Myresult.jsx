import React from "react";
import major from '../../../image/major.png';
import personal from '../../../image/profile.png'

const MyResultTest = () => {
  const results = [
    {
      id: 1,
      date: "Nov 02, 2024",
      title: "Major Recommend",
      image: major, // Replace with your image path
      link: "#",
    },
    {
      id: 2,
      date: "Nov 02, 2024",
      title: "Personality Test",
      image: personal, // Replace with your image path
      link: "#",
    },
  ];

  return (
    <div className=" ">
      <div className="w-full mx-auto rounded-lg p-2 ">
        {/* Header Section */}
        <h2 className="lg:text-2xl md:text-xl text-sm font-bold text-blue-900 mb-2 text-left mx-2">
          My Result Test
        </h2>
        <p className="text-gray-500 lg:text-2xl md:text-xl text-sm mb-6 text-left mx-2">
          View your last result test
        </p>
        <hr className="border-gray-300 mb-6" />

        {/* Result Cards Section */}
        <div className="flex flex-wrap gap-6">
          {results.map((result) => (
            <div
              key={result.id}
              className=" p-4 w-full sm:w-80 text-center bg-white"
            >
              <p className="text-sm text-gray-500 mb-2">Date: {result.date}</p>
              <div className="mb-4">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-20 h-20 mx-auto rounded-md"
                />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                {result.title}
              </h3>
              <a
                href={result.link}
                className="text-pink-600 text-sm font-semibold hover:underline"
              >
                See Result &gt;&gt;
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyResultTest;

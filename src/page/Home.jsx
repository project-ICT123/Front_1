import React from "react";
import { Link } from "react-router-dom";

import IQTest from "../asset/IQTest";
import Card from "../components/Card";
import scholar from "../image/scholar.png";
import major from "../image/major.png";
import fire from "../image/fire.png";
import university from "../image/school.png";
import online from "../image/online_learn.png";
import person from "../image/profile.png";

import Footer from "../asset/Footer"

const handleCardClick = () => {
  console.log('Scholarship card clicked!');
};


const HomePage = () => {
  return (
    <main className="  flex flex-col items-center justify-center ">
      {/* Row 1: Four Columns */}
      <nav className=" lgm:px-[4rem] p-6 mt-[5px] grid grid-cols-1 sm375:grid-cols-2 lgm:grid-cols-3 lgd:grid-cols-4 gap-6 w-full lgm:space-y-[1rem] lgl:space-y-[7rem] lgl:mb-[3rem] mb-[1.5rem]">
        {/* Hello dev */}
        <div className="bg-gradient-to-r lgl:mt-[6rem] rounded-lg flex items-center justify-center">
          <div>
            <h1 className="text-3xl text-left sm:text-4xl font-extrabold text-logocolor">
              Hello !
            </h1>
            <p className="text-lg text-left sm:text-xl text-logocolor mt-4">
              Find the Major <br /> That Fits You Best.
            </p>
          </div>
        </div>

        <Link to="/major_test">
          <Card
            imageSrc={major}
            images={fire}
            title="Major Recommend"
            onClick={handleCardClick}
          />
        </Link>

        <Link to="/major_test">
          <Card
            imageSrc={scholar}
            title="Scholarship"
            onClick={handleCardClick}
          />
        </Link>

        <Link to="/major_test">
          <Card
            imageSrc={university}
            title="Universities"
            onClick={handleCardClick}
          />
        </Link>

        <Link to="/online">
          <Card
            imageSrc={online}
            title="Online Learning"
            onClick={handleCardClick}
          />
        </Link>

        <Link to="/online">
          <Card
            imageSrc={person}
            title="Personality Test"
            onClick={handleCardClick}
          />
        </Link>

        {/* IQTest Component: Show as a single item on smaller screens */}
        <div className="sm375:col-span-2 lgd:col-span-2 lgm:col-span-3">
          <IQTest />
        </div>

      </nav>

      <nav className="bg-white w-full">
        <Footer />
      </nav>

    </main>
  );
};

export default HomePage;
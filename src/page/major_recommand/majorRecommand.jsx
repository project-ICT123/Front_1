import React from 'react'; 
import { useNavigate } from 'react-router-dom';

import PersonalityTraitsList from "../../asset/personal_style";
import Button from "../../components/button";

function MajorRecommend() {
  const navigate = useNavigate(); 
  const typeqcm = "Major Recommend";

  return (
    <main className='sm573:px-8 px-3'>
      <header className="relative">
        <div className='absolute md:top-[-1rem] top-[-6rem] left-[4px] md:left-0'>
          <Button
            onClick={() => navigate('/')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-4 mr-[5px] mt-[-1px]"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Go Back
          </Button>
        </div>
        
        <div className='mt-[2rem]'> 
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl md:mt-0 mt-[6rem] font-semibold text-logocolor md:mb-5 sm:mb-3">
            Major Recommend
          </h1>
          <p className="text-center text-sm sm:text-base md:text-lg text-gray mb-3">
            Find the major that suits you best <br/> based on your personality by doing the TEST.
          </p>
        </div>
      </header>

      <section className='mt-[2rem] flex items-center justify-center mb-[0.8rem]'>
        <PersonalityTraitsList typeqcm={typeqcm} destination="/major_test/all_question/major" testType="major"/>
      </section>
    </main>
  );
}

export default MajorRecommend;

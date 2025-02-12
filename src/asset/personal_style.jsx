import { useState, useEffect } from 'react';
import axios from 'axios';
import StartQuiz from '../page/quiz_component/startQuiz';
import TraitsList from './TraitsList';

const PersonalityTraitsList = ({ typeqcm, destination, testType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traitsData, setTraitsData] = useState([]);
  const [personalityTypes, setPersonalityTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL_SERVER = process.env.REACT_APP_BASE_URL_SERVER;

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL_SERVER}getpersonalityType`, {
          headers: {
            'APP_KEY': process.env.REACT_APP_APP_KEY,
            'Authorization': `Bearer ${token}`,
          },
          signal: controller.signal
        });

        const data = response.data;

        const transformedPersonalityTypes = data.code_all.map(type => ({
          initial: type.code.trim(),
        }));

        setPersonalityTypes(transformedPersonalityTypes);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Error fetching data:', err);
          setError('Failed to load data. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const LoadingSkeleton = ({ items, isGrid = false }) => (
    <div className={`flex flex-wrap justify-center gap-4 ${isGrid ? 'grid grid-cols-2 sm375:grid-cols-3 sm573:grid-cols-4 sm879:grid-cols-6 lgm:grid-cols-3 lgd:grid-cols-5' : ''}`}>
      {Array(items).fill(0).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="w-[7rem] h-[3rem] bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
        <button 
          onClick={() => window.location.reload()}
          className="ml-2 px-4 py-2 bg-logocolor text-white rounded hover:bg-pink transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className='flex flex-col lgm:flex-row sm:gap-[2rem] lgl:gap-[15rem] mt-0 lgl:mt-[5rem]'>
      <div className="lgm:w-[30rem] lgl:w-[40rem] lgm:h-[23rem] sm879:h-[15rem] bg-white py-[1.5rem] rounded-2xl">
        <header>
          <h1 className="text-center text-base sm:text-xl font-semibold text-logocolor sm:mb-5 mb-2">
            Personal Style Inventory Profiles
          </h1>
          <p className="text-center text-sm sm:text-base md:text-lg text-gray sm:mb-3">
            Key Letters
          </p>
        </header>
        <section className="flex items-center justify-center mt-[1rem]">
          {isLoading ? (
            <LoadingSkeleton items={4} />
          ) : (
            <TraitsList />
          )}
        </section>
      </div>

      <div className="py-[1.5rem] rounded-2xl">
        <header>
          <h1 className="text-center text-base sm:text-xl font-semibold text-logocolor sm:mb-5 mb-2">
            16 types of personal style
          </h1>
          <p className="text-center text-sm sm:text-base md:text-lg text-gray sm:mb-3">
            by combining with 4 key letters
          </p>
        </header>
        <section className="flex items-center justify-center w-full">
          <nav className="flex justify-center items-start my-[1rem] mb-[2.5rem] w-full">
            {isLoading ? (
              <LoadingSkeleton items={16} isGrid />
            ) : (
              <div className="grid grid-cols-2 sm375:grid-cols-3 sm573:grid-cols-4 sm879:grid-cols-6 lgm:grid-cols-3 lgd:grid-cols-5 gap-4">
                {personalityTypes.map((type, index) => (
                  <div key={index} className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center justify-center w-[7rem] h-[3rem] bg-white rounded-lg text-logocolor font-bold text-sm">
                      {type.initial}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </nav>
        </section>
        
        {!isLoading && (
          <section className="fixed bottom-[3.5rem] right-[2rem] lgl:bottom-[18rem]">
            <div
              onClick={handleOpenModal}
              className="h-[4rem] w-[4rem] bg-logocolor text-white shadow rounded-full flex items-center justify-center relative hover:bg-pink cursor-pointer transition-all duration-300"
            >
              <h3 className="font-semibold text-sm sm:text-base text-center">Test</h3>
            </div>
          </section>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="sm:p-6 max-w-4xl flex relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-12 text-gray hover:text-pink absolute top-2 right-2 m-4 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
            <StartQuiz typeqcm={typeqcm} destination={destination} testType={testType} />
          </div>
        </div>
      )}
    </main>
  );
};

export default PersonalityTraitsList;
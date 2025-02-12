import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const TraitsComponent = () => {
  const BASE_URL_SERVER = process.env.REACT_APP_BASE_URL_SERVER;
  const [traitsData, setTraitsData] = useState([]);
  const [personalityTypes, setPersonalityTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrait, setSelectedTrait] = useState(null); // Define selectedTrait
  const panelRef = useRef(null); // Reference for the details panel
  const listRef = useRef(null); // Reference for the trait list

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL_SERVER}getpersonalityType`, {
          headers: {
            'APP_KEY': process.env.REACT_APP_APP_KEY,
            'Authorization': `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        const data = response.data;

        const transformedTraitsData = data?.personalityTypes?.map(trait => ({
          initial: trait.acronym_en?.trim() || '',
          name: trait.full_name_en?.trim() || '',
          bgColor: trait['bg-color'] || 'bg-gray-400',
          details: trait.description_en?.trim() || 'No details available.',
        })) || [];

        const transformedPersonalityTypes = data?.code_all?.map(type => ({
          initial: type.code?.trim() || '',
        })) || [];

        setTraitsData(transformedTraitsData);
        setPersonalityTypes(transformedPersonalityTypes);
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

  // Close the details panel if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && !listRef.current.contains(event.target)) {
        setSelectedTrait(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-start w-full relative">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
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
                  onClick={() => setSelectedTrait(trait)}
                  className="text-gray text-sm sm:text-base md:text-lg cursor-pointer"
                >
                  {trait.name}
                </span>

                {/* Details Panel */}
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
      )}
    </div>
  );
};

export default TraitsComponent;

import React, { useEffect, useState, useCallback } from "react";
import s from "../../image/1.png";
import w from "../../image/2.png";

function Strengthsandweaknesses({ typeqcm, destination = "/all_question" }) {
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [personalityType, setPersonalityType] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const storedResults = localStorage.getItem("testResults");
      if (!storedResults) {
        throw new Error("No personality results found.");
      }

      const personalityResult = JSON.parse(storedResults);
      if (!personalityResult?.personality_type) {
        throw new Error("Invalid personality type.");
      }

      const token = localStorage.getItem("token");
      const appKey = process.env.REACT_APP_APP_KEY;
      const baseUrl = process.env.REACT_APP_BASE_URL_SERVER;

      const response = await fetch(
        `${baseUrl}getStrengthandWeakness?personality_result=${personalityResult.personality_type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            APP_KEY: appKey,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch data.");

      const data = await response.json();
      setStrengths(data.strengths || []);
      setWeaknesses(data.weaknesses || []);
      setPersonalityType(personalityResult.personality_result);
    } catch (error) {
      console.error("Error fetching strengths and weaknesses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="flex justify-center items-center">
      {/* Container */}
      <nav className="w-full max-w-4xl p-5 md:p-12 bg-white rounded-2xl shadow">
        {/* Title */}
        <div>
          <h1 className="text-center text-lg sm375:text-xl sm:text-2xl md:text-3xl font-semibold font-bold text-logocolor sm375:mb-3 mb-1">
            Strengths and Weaknesses
          </h1>
          <p className="text-center text-sm sm:text-base md:text-lg text-gray mb-3">
            Based on your Personality Type, <br /> This is your Strengths (S) and Weaknesses (W)
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 mt-4">Loading...</div>
        ) : (
          <div className="max-w-md mx-auto p-3 bg-bgcolor border-2 border-pink rounded-lg shadow relative text-left">
            <h2 className="text-xl font-bold text-pink text-center">{personalityType}</h2>

            {/* Positive Traits */}
            <div className="mt-4">
              <ul className="text-gray space-y-1">
                {strengths.length > 0 ? (
                  strengths.map((item, index) => (
                    <li key={index} className="flex">
                      <img src={s} alt="Checkmark" className="w-5 h-5 mr-2" /> {item}
                    </li>
                  ))
                ) : (
                  <li className="text-center text-gray-500">No strengths found.</li>
                )}
              </ul>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-logocolor my-3"></div>

            {/* Negative Traits */}
            <div>
              <ul className="text-gray space-y-1">
                {weaknesses.length > 0 ? (
                  weaknesses.map((item, index) => (
                    <li key={index} className="flex">
                      <img src={w} alt="Checkmark" className="w-5 h-5 mr-2" /> {item}
                    </li>
                  ))
                ) : (
                  <li className="text-center text-gray-500">No weaknesses found.</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </main>
  );
}

export default Strengthsandweaknesses;

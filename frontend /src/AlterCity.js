import React, { useState, useEffect } from 'react';
import CityScene from './components/CityScene';
import { getCityStats, getAvailableDecisions, applyDecision, timeTravel } from './services/apiService';
const TIME_TRAVEL_YEARS = [1933, 1966, 1999, 2032];

const AlterCity = () => {
  const [cityStats, setCityStats] = useState(null);
  const [availableDecisions, setAvailableDecisions] = useState([]);
  const [selectedDecision, setSelectedDecision] = useState(null);

  useEffect(() => {
    fetchCityStats();
    fetchAvailableDecisions();
  }, []);

  const fetchCityStats = async () => {
    const stats = await getCityStats();
    setCityStats(stats);
  };

  const fetchAvailableDecisions = async () => {
    const decisions = await getAvailableDecisions();
    setAvailableDecisions(decisions);
  };

  const handleDecisionClick = (decision) => {
    setSelectedDecision(decision);
  };

  const handleConfirmDecision = async () => {
    if (selectedDecision) {
      await applyDecision(selectedDecision.name);
      fetchCityStats();
      fetchAvailableDecisions();
      setSelectedDecision(null);
    }
  };

  const handleTimeTravel = async (year) => {
    await timeTravel(year);
    fetchCityStats();
    fetchAvailableDecisions();
  };

  if (!cityStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AlterCity: Echoes of Time</h1>
      <CityScene
        cityStats={cityStats}
        availableDecisions={availableDecisions}
        selectedDecision={selectedDecision}
        onDecisionClick={handleDecisionClick}
        onConfirmDecision={handleConfirmDecision}
        onTimeTravel={handleTimeTravel}
        timeTravelYears={TIME_TRAVEL_YEARS}
      />
    </div>
  );
};

export default AlterCity;
import React, { useMemo } from 'react';
import CityImage from './CityImage';
import CityStats from './CityStats';
import DecisionPanel from './DecisionPanel';
import TimeTravelPanel from './TimeTravelPanel';

const CityScene = React.memo(({
  cityStats,
  availableDecisions,
  selectedDecision,
  onDecisionClick,
  onConfirmDecision,
  onTimeTravel,
  timeTravelYears
}) => {
  const memoizedCityImage = useMemo(() => <CityImage cityStats={cityStats} />, [cityStats]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#87CEEB', // Sky blue background
      overflow: 'hidden',
    }}>
      <svg viewBox="0 0 1000 600" style={{ width: '100%', height: '100%' }}>
        {memoizedCityImage}
      </svg>
      
      <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
        <DecisionPanel
          availableDecisions={availableDecisions}
          selectedDecision={selectedDecision}
          onDecisionClick={onDecisionClick}
          onConfirmDecision={onConfirmDecision}
        />
      </div>
      
      <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
        <CityStats stats={cityStats} />
      </div>
      
      <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
        <TimeTravelPanel
          onTimeTravel={onTimeTravel}
          timeTravelYears={timeTravelYears}
        />
      </div>
    </div>
  );
});

export default CityScene;
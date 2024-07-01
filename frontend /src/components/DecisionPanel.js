import React from 'react';
import { PixelBorder, pixelFontStyle } from './UIComponents';

const DecisionPanel = React.memo(({ availableDecisions, selectedDecision, onDecisionClick, onConfirmDecision, cityStats }) => {
  const getDecisionImpact = (decision) => {
    let impact = 0;
    for (const [stat, value] of Object.entries(decision.effects)) {
      impact += value;
    }
    return impact > 0 ? 'Positive' : impact < 0 ? 'Negative' : 'Neutral';
  };

  const canAffordDecision = (decision) => {
    return cityStats.population >= decision.cost;
  };

  return (
    <PixelBorder style={{ width: '256px' }}>
      <h2 style={{ ...pixelFontStyle, fontSize: '18px', marginBottom: '8px', color: '#ffd700' }}>Decisions</h2>
      <div>
        {availableDecisions.map((decision) => (
          <button
            key={decision.name}
            onClick={() => onDecisionClick(decision)}
            style={{
              ...pixelFontStyle,
              width: '100%',
              padding: '8px',
              textAlign: 'left',
              fontSize: '12px',
              backgroundColor: selectedDecision === decision ? '#0d47a1' : '#333',
              color: selectedDecision === decision ? '#fff' : '#ccc',
              border: 'none',
              marginBottom: '8px',
              cursor: 'pointer',
              opacity: canAffordDecision(decision) ? 1 : 0.5,
            }}
            disabled={!canAffordDecision(decision)}
          >
            {decision.name}
            <span style={{ float: 'right', color: getDecisionImpact(decision) === 'Positive' ? '#4caf50' : getDecisionImpact(decision) === 'Negative' ? '#f44336' : '#ffeb3b' }}>
              {getDecisionImpact(decision)}
            </span>
          </button>
        ))}
      </div>
      {selectedDecision && (
        <div>
          <p style={{ ...pixelFontStyle, fontSize: '12px', color: '#fff', marginBottom: '8px' }}>
            {selectedDecision.description}
          </p>
          <ul style={{ ...pixelFontStyle, fontSize: '10px', color: '#ccc', marginBottom: '8px', paddingLeft: '20px' }}>
            {Object.entries(selectedDecision.effects).map(([stat, value]) => (
              <li key={stat}>{stat}: {value > 0 ? '+' : ''}{value}</li>
            ))}
          </ul>
          <button
            onClick={onConfirmDecision}
            style={{
              ...pixelFontStyle,
              width: '100%',
              padding: '8px',
              fontSize: '12px',
              backgroundColor: '#2e7d32',
              color: '#fff',
              border: 'none',
              marginTop: '16px',
              cursor: 'pointer',
            }}
          >
            Confirm Decision (Cost: {selectedDecision.cost})
          </button>
        </div>
      )}
    </PixelBorder>
  );
});

export default DecisionPanel;
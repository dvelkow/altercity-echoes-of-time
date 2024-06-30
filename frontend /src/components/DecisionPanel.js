import React from 'react';
import { PixelBorder, pixelFontStyle } from './UIComponents';

const DecisionPanel = React.memo(({ availableDecisions, selectedDecision, onDecisionClick, onConfirmDecision }) => {
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
            }}
          >
            {decision.name}
          </button>
        ))}
      </div>
      {selectedDecision && (
        <div>
          <p style={{ ...pixelFontStyle, fontSize: '12px', color: '#fff', marginBottom: '8px' }}>
            {selectedDecision.description}
          </p>
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
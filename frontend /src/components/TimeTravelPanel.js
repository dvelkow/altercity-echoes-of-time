import React from 'react';
import { PixelBorder, pixelFontStyle } from './UIComponents';

const TimeTravelPanel = React.memo(({ onTimeTravel, timeTravelYears }) => {
  return (
    <PixelBorder style={{ width: '256px' }}>
      <h2 style={{ ...pixelFontStyle, fontSize: '18px', marginBottom: '8px', color: '#ffd700' }}>Time Travel</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {timeTravelYears.map((year) => (
          <button
            key={year}
            onClick={() => onTimeTravel(year)}
            style={{
              ...pixelFontStyle,
              padding: '8px',
              fontSize: '12px',
              backgroundColor: '#4a148c',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {year}
          </button>
        ))}
      </div>
    </PixelBorder>
  );
});

export default TimeTravelPanel;
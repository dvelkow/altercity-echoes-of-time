import React from 'react';
import { PixelBorder, pixelFontStyle } from './UIComponents';

const CityStats = React.memo(({ stats }) => {
  return (
    <PixelBorder style={{ width: '256px' }}>
      <h2 style={{ ...pixelFontStyle, fontSize: '18px', marginBottom: '8px', color: '#ffd700' }}>City Stats</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(stats).map(([key, value]) => (
          <li key={key} style={{ ...pixelFontStyle, fontSize: '12px', color: '#fff', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', width: '128px' }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
            <span style={{ color: '#4caf50' }}>{typeof value === 'number' ? value.toFixed(2) : value}</span>
          </li>
        ))}
      </ul>
    </PixelBorder>
  );
});

export default CityStats;
import React from 'react';

// Pixel font style
export const pixelFontStyle = {
  fontFamily: '"Press Start 2P", cursive',
  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
};

// Pixelated border component
export const PixelBorder = ({ children, style }) => (
  <div style={{
    position: 'relative',
    padding: '1px',
    ...style,
  }}>
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: '#111',
      border: '2px solid #333',
    }} />
    <div style={{
      position: 'relative',
      zIndex: 10,
      backgroundColor: '#222',
      padding: '12px',
    }}>
      {children}
    </div>
  </div>
);
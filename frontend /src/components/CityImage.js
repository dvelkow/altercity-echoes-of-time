import React, { useMemo, useCallback } from 'react';

const CityImage = React.memo(({ cityStats }) => {
  const skyColor = '#87CEEB';
  const grassColor = '#567d46';
  const waterColor = '#4a80aa';

  // Helper function to create a random color variation
  const colorVariation = useCallback((baseColor, range) => {
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    return `rgb(${r + Math.random() * range - range / 2}, ${g + Math.random() * range - range / 2}, ${b + Math.random() * range - range / 2})`;
  }, []);

  // Helper function to create a pixelated rectangle
  const pixelRect = useCallback((x, y, width, height, color) => (
    <rect x={x} y={y} width={width} height={height} fill={color} shapeRendering="crispEdges" />
  ), []);

  // Create clouds
  const clouds = useMemo(() => {
    return Array(10).fill().map((_, i) => {
      const x = Math.random() * 950;
      const y = 50 + Math.random() * 100;
      const cloudParts = Array(5).fill().map((_, j) => (
        <circle
          key={j}
          cx={x + j * 15}
          cy={y + (Math.random() - 0.5) * 10}
          r={10 + Math.random() * 10}
          fill="white"
          opacity={0.8}
        />
      ));
      return <g key={i}>{cloudParts}</g>;
    });
  }, []);

  // Create distant mountains
  const mountains = useMemo(() => {
    return (
      <g>
        <path d="M0,300 Q250,100 500,300 T1000,250" fill="#3a4a6d" />
        <path d="M-100,350 Q200,180 500,320 T1100,300" fill="#2a3a5d" />
      </g>
    );
  }, []);

  // Create buildings
  const buildings = useMemo(() => {
    const buildingCount = Math.min(Math.floor(cityStats.population / 50000), 15);
    return Array(buildingCount).fill().map((_, i) => {
      const x = 20 + i * 65;
      const height = 100 + Math.random() * 150;
      const width = 50 + Math.random() * 30;
      const baseColor = ['#d2b48c', '#deb887', '#cd853f', '#8b4513'][Math.floor(Math.random() * 4)];
      
      const windows = Array(Math.floor(height / 30)).fill().map((_, j) => (
        <g key={j}>
          {pixelRect(x + 10, 550 - height + j * 30, 10, 15, '#87CEFA')}
          {pixelRect(x + width - 20, 550 - height + j * 30, 10, 15, '#87CEFA')}
        </g>
      ));

      return (
        <g key={i}>
          {pixelRect(x, 550 - height, width, height, baseColor)}
          {pixelRect(x - 5, 550 - height - 20, width + 10, 20, '#8b4513')}
          {windows}
          {pixelRect(x + width / 2 - 10, 550 - 40, 20, 40, '#4a2700')}
        </g>
      );
    });
  }, [cityStats.population, pixelRect]);

  // Create trees
  const trees = useMemo(() => {
    const treeCount = Math.floor((cityStats.environment / 100) * 20);
    return Array(treeCount).fill().map((_, i) => {
      const x = Math.random() * 1000;
      const y = 450 + Math.random() * 100;
      const treeColor = colorVariation('#228B22', 30);
      return (
        <g key={i}>
          {pixelRect(x, y, 10, 30, '#8B4513')}
          <polygon
            points={`${x-15},${y} ${x+5},${y-40} ${x+25},${y}`}
            fill={treeColor}
            shapeRendering="crispEdges"
          />
        </g>
      );
    });
  }, [cityStats.environment, colorVariation, pixelRect]);

  // Create water elements
  const water = useMemo(() => {
    const waterLevel = 550 + Math.sin(Date.now() / 1000) * 5;
    return (
      <g>
        <path d={`M0,${waterLevel} Q250,${waterLevel-20} 500,${waterLevel} T1000,${waterLevel-10}`} fill={waterColor} />
        {Array(20).fill().map((_, i) => (
          <circle key={i} cx={Math.random() * 1000} cy={waterLevel + Math.random() * 20} r={1} fill="white" opacity={0.5} />
        ))}
      </g>
    );
  }, [waterColor]);

  // Create animated birds
  const birds = useMemo(() => {
    return Array(5).fill().map((_, i) => {
      const x = Math.random() * 900;
      const y = 100 + Math.random() * 200;
      return (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <path d="M0,0 Q5,-5 10,0 Q15,-5 20,0" fill="none" stroke="black" strokeWidth="2">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 5; 0 0"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      );
    });
  }, []);

  // Create foreground details
  const foregroundDetails = useMemo(() => {
    return (
      <g>
        {pixelRect(0, 580, 1000, 20, '#3a523a')}
        {Array(50).fill().map((_, i) => (
          <g key={i}>
            {pixelRect(Math.random() * 1000, 570 + Math.random() * 30, 2, 2, ['#ff69b4', '#ffff00', '#ff6347'][Math.floor(Math.random() * 3)])}
          </g>
        ))}
      </g>
    );
  }, [pixelRect]);

  // Create city atmosphere effects
  const cityAtmosphere = useMemo(() => {
    const fogOpacity = Math.max(0, 1 - cityStats.environment / 100);
    return (
      <g>
        <rect x="0" y="0" width="1000" height="600" fill="#f0f0f0" opacity={fogOpacity * 0.3} />
        {Array(100).fill().map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1000}
            cy={Math.random() * 600}
            r={1}
            fill="#f0f0f0"
            opacity={fogOpacity * 0.5}
          />
        ))}
      </g>
    );
  }, [cityStats.environment]);

  // Create dynamic light based on technology level
  const cityLights = useMemo(() => {
    const lightIntensity = cityStats.technology / 100;
    return Array(Math.floor(lightIntensity * 20)).fill().map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 1000}
        cy={500 + Math.random() * 100}
        r={2}
        fill="yellow"
        opacity={0.6}
      >
        <animate
          attributeName="opacity"
          values="0.6;0.3;0.6"
          dur={`${1 + Math.random() * 2}s`}
          repeatCount="indefinite"
        />
      </circle>
    ));
  }, [cityStats.technology]);

  // Helper function to create a pixelated human
  const createHuman = useCallback((x, y, type) => {
    const skinTones = ['#FCD8B4', '#E0AC69', '#C68642', '#8D5524'];
    const hairColors = ['#1C1C1C', '#4E3835', '#D6C4C2', '#FFCC47'];
    const skinColor = skinTones[Math.floor(Math.random() * skinTones.length)];
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    
    const baseHuman = (
      <g>
        {/* Body */}
        {pixelRect(0, 0, 8, 12, skinColor)}
        {/* Head */}
        {pixelRect(1, -8, 6, 8, skinColor)}
        {/* Hair */}
        {pixelRect(0, -9, 8, 3, hairColor)}
        {/* Eyes */}
        {pixelRect(2, -5, 1, 1, '#000')}
        {pixelRect(5, -5, 1, 1, '#000')}
      </g>
    );

    switch(type) {
      case 'worker':
        return (
          <g>
            {baseHuman}
            {/* Hard hat */}
            {pixelRect(-1, -11, 10, 3, '#FFD700')}
          </g>
        );
      case 'business':
        return (
          <g>
            {baseHuman}
            {/* Suit */}
            {pixelRect(0, 0, 8, 12, '#2C3E50')}
          </g>
        );
      case 'artist':
        return (
          <g>
            {baseHuman}
            {/* Beret */}
            {pixelRect(-2, -10, 12, 2, '#E74C3C')}
          </g>
        );
      default:
        return baseHuman;
    }
  }, [pixelRect]);

  // Create moving humans
  const humans = useMemo(() => {
    const humanCount = Math.floor(cityStats.population / 50000);
    const types = ['default', 'worker', 'business', 'artist'];
    return Array(humanCount).fill().map((_, i) => {
      const y = 520 + Math.random() * 60;
      const type = types[Math.floor(Math.random() * types.length)];
      const direction = Math.random() < 0.5 ? 1 : -1; // 1 for right, -1 for left
      const speed = 50 + Math.random() * 100; // Random speed between 50 and 150
      return (
        <g key={i}>
          {createHuman(0, 0, type)}
          <animateMotion
            path={`M${direction === 1 ? -10 : 1010},${y} h${direction * 1020}`}
            dur={`${1020 / speed}s`}
            repeatCount="indefinite"
          />
        </g>
      );
    });
  }, [cityStats.population, createHuman]);

  // Create road
  const road = useMemo(() => {
    return (
      <g>
        {/* Main road */}
        {pixelRect(0, 550, 1000, 30, '#555')}
        {/* Road markings */}
        {Array(20).fill().map((_, i) => (
          <rect key={i} x={i * 50} y={564} width={30} height={2} fill="#FFF" />
        ))}
      </g>
    );
  }, [pixelRect]);

  // Create moving vehicles
  const vehicles = useMemo(() => {
    const vehicleCount = Math.floor(cityStats.infrastructure / 10);
    return Array(vehicleCount).fill().map((_, i) => {
      const vehicleType = Math.random() < 0.7 ? 'car' : 'truck';
      const color = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00'][Math.floor(Math.random() * 4)];
      return (
        <g key={i}>
          {vehicleType === 'car' ? (
            <g>
              {pixelRect(0, 0, 20, 10, color)}
              {pixelRect(4, -4, 12, 4, '#87CEFA')}
            </g>
          ) : (
            <g>
              {pixelRect(0, 0, 30, 15, color)}
              {pixelRect(20, -5, 10, 5, '#87CEFA')}
            </g>
          )}
          <animateMotion
            path="M-30,565 H1030"
            dur={`${15 + Math.random() * 25}s`}
            repeatCount="indefinite"
          />
        </g>
      );
    });
  }, [cityStats.infrastructure, pixelRect]);

  // Create city activities
  const cityActivities = useMemo(() => {
    const activityCount = Math.floor(cityStats.culture / 10);
    return Array(activityCount).fill().map((_, i) => {
      const x = 50 + Math.random() * 900;
      const y = 500 + Math.random() * 80;
      return (
        <g key={i}>
          {/* Represent an activity (e.g., market stall, street performance) */}
          {pixelRect(x, y, 15, 15, colorVariation('#FFA500', 30))}
          {/* People gathered around the activity */}
          {createHuman(x-10, y+5, 'default')}
          {createHuman(x+20, y+8, 'default')}
        </g>
      );
    });
  }, [cityStats.culture, pixelRect, colorVariation, createHuman]);

  return (
    <svg viewBox="0 0 1000 600" style={{ width: '100%', height: '100%' }}>
      <rect width="1000" height="600" fill={skyColor} />
      {clouds}
      {mountains}
      {buildings}
      {trees}
      {water}
      {birds}
      {foregroundDetails}
      {cityAtmosphere}
      {cityLights}
      {road}
      {vehicles}
      {humans}
      {cityActivities}
    </svg>
  );
});

export default CityImage;
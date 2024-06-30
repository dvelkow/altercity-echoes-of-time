import React from 'react';
import { createRoot } from 'react-dom/client';
import AlterCity from './AlterCity';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AlterCity />
  </React.StrictMode>
);

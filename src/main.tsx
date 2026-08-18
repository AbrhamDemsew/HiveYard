import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HiveYardApp from './HiveYardApp';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HiveYardApp />
  </StrictMode>,
);

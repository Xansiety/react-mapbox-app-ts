import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

if (!navigator.geolocation) {
  const message = 'Your browser cant read your location';
  alert(message);
  throw new Error(message);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { MAPBOX_TOKEN } from './config';

mapboxgl.accessToken = MAPBOX_TOKEN;

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

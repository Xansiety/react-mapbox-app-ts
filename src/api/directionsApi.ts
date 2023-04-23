import axios from 'axios';
import { MAPBOX_TOKEN } from '../config';

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    access_token: MAPBOX_TOKEN,
    overview: 'simplified',
    steps: true
  }
});

export default directionsApi;

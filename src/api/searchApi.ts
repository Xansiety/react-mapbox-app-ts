import axios from 'axios';
import { MAPBOX_TOKEN } from '../config';

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    access_token: MAPBOX_TOKEN
  }
});

export default searchApi;
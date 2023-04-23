import { createContext } from 'react';
import { Map } from 'mapbox-gl';

export interface IMapContextProps {
  isMapReady: boolean;
  map?: Map;
}

export const MapContext = createContext({} as IMapContextProps);

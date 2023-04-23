import { createContext } from 'react';
import { Map } from 'mapbox-gl';

export interface IMapContextProps {
  isMapReady: boolean;
  map?: Map;
  // methods
  setMap: (map: Map) => void;
}

export const MapContext = createContext({} as IMapContextProps);

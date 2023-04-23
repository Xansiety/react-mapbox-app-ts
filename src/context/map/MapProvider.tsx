import { useReducer } from 'react';
import { Map } from 'mapbox-gl';
import { MapContext, MapReducer } from '.';

export interface IMapState {
  isMapReady: boolean;
  map?: Map;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: IMapState = {
  isMapReady: false,
  map: undefined
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  return (
    <MapContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

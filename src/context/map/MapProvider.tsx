import { useReducer } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
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

  const setMap = (map: Map) => {
    // Marker
    new Marker({
      color: 'teal'
    })
      .setLngLat(map.getCenter())
      .setPopup(new Popup().setHTML(`<div></div><h4>Aquí estoy</h4> <span>En algún lugar del mundo</span>`))
      .addTo(map);

    dispatch({ type: 'setMap', payload: map });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

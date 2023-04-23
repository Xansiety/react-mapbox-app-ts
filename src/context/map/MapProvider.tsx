import { useContext, useEffect, useReducer } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext, MapReducer } from '.';
import { PlacesContext } from '..';
import { directionsApi } from '../../api';
import { DirectionMapBox } from '../../interfaces';

export interface IMapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: IMapState = {
  isMapReady: false,
  map: undefined,
  markers: []
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    // console.log('places', places)
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup({ offset: 25 }).setHTML(
        `<div><h6>${place.text}</h6> <p>${place.place_name}</p></div>`
      );
      const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!);
      newMarkers.push(newMarker);
    }
    // TODO: Remove POLYLINE from map
    dispatch({ type: 'setMarkers', payload: newMarkers });
  }, [places]);

  const setMap = (map: Map) => {
    // Marker
    new Marker({
      color: 'teal'
    })
      .setLngLat(map.getCenter())
      .setPopup(
        new Popup().setHTML(`<div></div><h4>Aquí estoy</h4> <span>En algún lugar del mundo</span>`)
      )
      .addTo(map);
    dispatch({ type: 'setMap', payload: map });
  };

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const { data } = await directionsApi.get<DirectionMapBox>(
      `${start.join(',')};${end.join(',')}`
    );
    const { distance, duration, geometry } = data.routes[0];
    let kms = distance / 1000;
    kms = Math.round(kms * 100) / 100;
    let minutes = duration / 60;
    console.log('distance', distance, 'duration', duration);
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

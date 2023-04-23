import { useContext, useEffect, useReducer } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
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
    console.log('distance', distance, 'duration', duration, 'minutes', minutes, 'kms', kms);

    const { coordinates: coords } = geometry;

    // Define a bounds
    const bounds = new LngLatBounds(start, start);
    for (const cord of coords as any) {
      const newCord: [number, number] = [cord[0], cord[1]];
      bounds.extend(newCord);
    }
    state.map!.fitBounds(bounds, { padding: 150 });

    // define a polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords as any
            }
          }
        ]
      }
    };

    // Remove old polyline
    if (state.map?.getLayer('route-string')) {
      state.map?.removeLayer('route-string');
      state.map?.removeSource('route-string');
    }

    state.map?.addSource('route-string', sourceData);

    // style the polyline
    state.map?.addLayer({
      id: 'route-string',
      type: 'line',
      source: 'route-string',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
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

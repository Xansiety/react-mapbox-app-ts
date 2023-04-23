import { Map, Marker } from 'mapbox-gl';
import { IMapState } from './MapProvider';

type MapAction = { type: 'setMap'; payload: Map } | { type: 'setMarkers'; payload: Marker[] };

export const MapReducer = (state: IMapState, action: MapAction): IMapState => {
  switch (action.type) {
    case 'setMap':
      return { ...state, map: action.payload, isMapReady: true };
    case 'setMarkers':
      return { ...state, markers: action.payload };
    default:
      return state;
  }
};

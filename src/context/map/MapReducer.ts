import { Map } from 'mapbox-gl';
import { IMapState } from './MapProvider';

type MapAction = { type: 'setMap'; payload: Map };

export const MapReducer = (state: IMapState, action: MapAction): IMapState => {
  switch (action.type) {
    case 'setMap':
      return { ...state, map: action.payload, isMapReady: true };
    default:
      return state;
  }
};

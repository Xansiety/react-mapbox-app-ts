import { Feature } from '../../interfaces';
import { IPlacesState } from './PlacesProvider';

type PlacesAction =
  | { type: 'setUserLocations'; payload: [number, number] }
  | { type: 'setPlaces'; payload: Feature[] }
  | { type: 'setLoadingPlaces' };

export const PlacesReducer = (state: IPlacesState, action: PlacesAction): IPlacesState => {
  switch (action.type) {
    case 'setUserLocations':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload
      };

    case 'setLoadingPlaces':
      return {
        ...state,
        isLoadingPlaces: true,
        places: []
      };
    case 'setPlaces':
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload
      };
    default:
      return state;
  }
};

import { IPlacesState } from './PlacesProvider';

type PlacesAction = { type: 'setUserLocations'; payload: [number, number] };

export const PlacesReducer = (state: IPlacesState, action: PlacesAction): IPlacesState => {
  switch (action.type) {
    case 'setUserLocations':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload
      };
      break;
    default:
      return state;
  }
};

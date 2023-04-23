import { useEffect, useReducer } from 'react';
import { PlacesContext, PlacesReducer } from '.';
import { getUserLocation } from '../../helpers';

export interface IPlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: IPlacesState = {
  isLoading: true,
  userLocation: undefined
};

export const PlacesProvider = ({ children }: Props) => {
  const [placeState, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) => dispatch({ type: 'setUserLocations', payload: lngLat }));
  }, []);

  return (
    <PlacesContext.Provider
      value={{
        ...placeState
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

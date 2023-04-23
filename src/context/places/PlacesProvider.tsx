import { useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { PlacesReducer } from './PlacesReducer';

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

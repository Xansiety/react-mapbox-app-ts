// import { IPlacesState } from './PlacesProvider';
import { createContext } from 'react';
import { Feature } from '../../interfaces';

// export interface PlacesContextProps extends IPlacesState {}
export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);

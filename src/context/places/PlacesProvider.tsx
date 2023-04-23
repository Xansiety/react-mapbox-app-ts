import { useEffect, useReducer } from 'react';
import { PlacesContext, PlacesReducer } from '.';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../api';

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

  const searchPlacesByTerm = async (query: string) => {
    if (query.trim().length <= 0) return []; //TODO Clear state
    if (!placeState.userLocation) throw new Error('User location is not defined');

    const { data } = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: placeState.userLocation.join(',')
      }
    });

    console.log(data);
    return data;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...placeState,
        searchPlacesByTerm
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

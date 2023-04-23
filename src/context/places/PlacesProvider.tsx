import { useEffect, useReducer } from 'react';
import { PlacesContext, PlacesReducer } from '.';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../api';
import { Feature, IResponseMapBox } from '../../interfaces';

export interface IPlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: IPlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
};

export const PlacesProvider = ({ children }: Props) => {
  const [placeState, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) => dispatch({ type: 'setUserLocations', payload: lngLat }));
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length <= 0) {
      dispatch({ type: 'setPlaces', payload: [] });
      return [];
    }
    if (!placeState.userLocation) throw new Error('User location is not defined');
    dispatch({ type: 'setLoadingPlaces' });
    const { data } = await searchApi.get<IResponseMapBox>(`/${query}.json`, {
      params: {
        proximity: placeState.userLocation.join(',')
      }
    });
    // console.log(data);
    dispatch({ type: 'setPlaces', payload: data.features });
    return data.features;
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

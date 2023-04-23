import { PlacesContext } from './PlacesContext';

export interface IPlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

// const INITIAL_STATE: IPlacesState = {
//   isLoading: true,
//   userLocation: undefined
// };

export const PlacesProvider = ({ children }: Props) => {
  return (
    <PlacesContext.Provider
      value={{
        isLoading: true,
        userLocation: undefined
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

import { useContext } from 'react';
import { PlacesContext } from '../context';
import { LoaderPlaces } from './';

export const SearchPlacesResult = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);

  if (isLoadingPlaces) return <LoaderPlaces />;

  if (places.length <= 0) return <></>;

  return (
    <ul className="list-group mt-3 result">
      {places.map((place) => (
        <li key={place.id} className="list-group-item list-group-item-action result-container">
          <h6 className="result-header">{place.text}</h6>
          <p className="text-muted result-description">{place.place_name}</p>
          <div className="result-buttons">
            <button className="btn btn-primary me-2 result-buttons__goto">Direction</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

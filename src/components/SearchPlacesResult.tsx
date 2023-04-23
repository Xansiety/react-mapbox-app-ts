import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { LoaderPlaces } from './';
import { Feature } from '../interfaces';

export const SearchPlacesResult = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [activePlaceId, setActivePlaceId] = useState('');

  const onPlaceGoToClick = (place: Feature) => {
    const [lng, lat] = place.center;
    setActivePlaceId(place.id);
    map?.flyTo({
      center: [lng, lat],
      essential: true
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces) return <LoaderPlaces />;

  if (places.length <= 0) return <></>;

  return (
    <ul className="list-group mt-3 result">
      {places.map((place) => (
        <li
          key={place.id}
          onClick={() => onPlaceGoToClick(place)}
          className={`list-group-item list-group-item-action result-container ${
            place.id === activePlaceId ? 'result-container__active' : ''
          }`}
        >
          <div>
            <h6 className="result-header">{place.text}</h6>
            <p className="result-description">{place.place_name}</p>
          </div>

          <div className="result-buttons">
            <button
              className="btn btn-primary me-2 result-buttons__goto"
              onClick={() => getRoute(place)}
            >
              Direction
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

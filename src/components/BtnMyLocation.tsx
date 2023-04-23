import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const BtnMyLocation = () => {
  const { map } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handleClick = () => {
    if (!map) throw new Error('Map is not defined or ready');
    if (!userLocation) throw new Error('User location is not defined');

    map.flyTo({
      center: userLocation,
      zoom: 14
    });
  };
  return (
    <button
      className="btn btn-primary"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999
      }}
      onClick={handleClick}
    >
      BtnMyLocation
    </button>
  );
};

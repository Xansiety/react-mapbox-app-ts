import { useContext, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import { MapContext, PlacesContext } from '../context';
import { Loading } from './';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const containerMap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: containerMap.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14 // starting zoom
      });
      setMap(map);
    }
  }, [isLoading, userLocation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={containerMap}
      style={{
        backgroundColor: 'orangered',
        height: '100vh',
        width: '100vw',
        top: 0,
        right: 0
      }}
    >
      {userLocation?.join(',')}
    </div>
  );
};

import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context';
import { SearchPlacesResult } from '.';

export const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlacesContext);
  const debounceRef = useRef<number | null>();

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      //   console.log(event.target.value);
      searchPlacesByTerm(event.target.value);
    }, 500);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search place"
        className="form-control"
        onChange={onQueryChange}
      />

      <SearchPlacesResult />
    </div>
  );
};

import { useState } from 'react';
import { useActiveLocationContext } from '../context/active-location-context';
import { SearchLimit, defaultPosition } from '../lib/contants';
import { Position } from '../lib/types';
import SuburbSearchSlider from './SuburbSearchSlider';

type Suburb = {
  id: number;
  suburbName: string;
  latitude: number;
  longitude: number;
};

const { minLatitude, maxLatitude, minLongitude, maxLongitude } = SearchLimit;

const SuburbSearch = () => {
  const {
    activeLocation: {
      result: {
        suburbName,
        latitude: defaultLatitude,
        longitude: defaultLongitude,
      },
    },
    setActiveLocation,
  } = useActiveLocationContext();

  const [position, setPosition] = useState<Position>([
    defaultLatitude,
    defaultLongitude,
  ]);

  const handleSetPosition = ([latitude, longitude]: Position) => {
    console.log([latitude, longitude]);
    setPosition([latitude, longitude]);
  };

  const handleSearch = async () => {
    try {
      const env = 'http://localhost:5015'; //temp

      const [latitude, longitude] = position;
      const url = `${env}/suburb?latitude=${latitude.toString()}&longitude=${longitude.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: Suburb = await response.json();

      setActiveLocation({ result: data, searched: [latitude, longitude] });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <div className={`search-container ${suburbName !== '' ? 'top' : ''}`}>
      <SuburbSearchSlider
        onSlide={handleSetPosition}
        sliderProps={{
          defaultPosition,
          max: { latitude: maxLatitude, longitude: maxLongitude },
          min: { latitude: minLatitude, longitude: minLongitude },
        }}
      />
      <input
        aria-label="suburb-search-button"
        type="button"
        value="Suburb Search"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SuburbSearch;

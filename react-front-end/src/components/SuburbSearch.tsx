import React, { useState } from 'react';
import { useActiveLocationContext } from '../context/active-location-context';

type Suburb = {
  id: number;
  suburbName: string;
  latitude: number;
  longitude: number;
};

const SuburbSearch = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const {
    activeLocation: { suburbName },
    setActiveLocation,
  } = useActiveLocationContext();

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const env = 'http://localhost:5015';
      const url = `${env}/suburb?latitude=${latitude.toString()}&longitude=${longitude.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: Suburb = await response.json();
      setActiveLocation(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    console.log('searched');
  };

  const renderSearch = () => {
    return (
      <div className="search-form-container">
        <form onSubmit={search}>
          <label>
            Latitude:{' '}
            <input
              type="number"
              step="any"
              value={latitude}
              required
              placeholder="Latitude"
              onChange={(e) => setLatitude(e.target.valueAsNumber)}
            />
          </label>
          <label>
            Longitude:{' '}
            <input
              type="number"
              step="any"
              value={longitude}
              required
              onChange={(e) => setLongitude(e.target.valueAsNumber)}
            />
          </label>
          <button className="button" type="submit">
            Suburb Search
          </button>
        </form>
      </div>
    );
  };
  return (
    <div className={`search-container ${suburbName !== '' ? 'top' : ''}`}>
      {renderSearch()}
      {/* {activeLocation && (
        <div>
          <h2>Closest Suburb:</h2>
          <p>Name: {activeLocation.suburbName}</p>
          <p>Latitude: {activeLocation.latitude}</p>
          <p>Longitude: {activeLocation.longitude}</p>
        </div>
      )} */}
    </div>
  );
};

export default SuburbSearch;

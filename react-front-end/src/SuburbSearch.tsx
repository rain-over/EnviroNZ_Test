import React, { useState } from 'react';

type Suburb = {
  id: number;
  suburbName: string;
  latitude: number;
  longitude: number;
};

const SuburbSearch = () => {
  const [suburbs, setSuburbs] = useState<Suburb | null>(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://localhost:5015/suburb');

      const env = 'http://localhost:5015';
      const url = `${env}/suburb?latitude=${latitude.toString()}&longitude=${longitude.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: Suburb = await response.json();
      setSuburbs(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    console.log('searched');
  };
  return (
    <div>
      <h1>Suburb Search</h1>
      <form onSubmit={search}>
        <label>
          Latitude:
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>

      {suburbs && (
        <div>
          <h2>Closest Suburb:</h2>
          <p>Name: {suburbs.suburbName}</p>
          <p>Latitude: {suburbs.latitude}</p>
          <p>Longitude: {suburbs.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default SuburbSearch;

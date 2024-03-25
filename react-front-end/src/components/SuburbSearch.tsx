import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useActiveLocationContext } from '../context/active-location-context';
import { SearchLimit } from '../lib/contants';
import { Position } from '../lib/types';
import SuburbSearchSlider from './SuburbSearchSlider';

type Suburb = {
  id: number;
  suburbName: string;
  latitude: number;
  longitude: number;
};

const SuburbSearch = () => {
  const {
    activeLocation: {
      result: {
        suburbName,
        latitude: defaultLatitude,
        longitude: defualtLongitude,
      },
    },
    setActiveLocation,
  } = useActiveLocationContext();

  const [latitude, setLatitude] = useState<number>(defaultLatitude);
  const [longitude, setLongitude] = useState<number>(defualtLongitude);
  const [expanded, setExpanded] = useState<boolean>(false);

  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = SearchLimit;

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
      setActiveLocation({ result: data, searched: [latitude, longitude] });
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    console.log('searched');
  };

  const handleSetPosition = ([latitude, longitude]: Position) => {
    console.log([latitude, longitude]);
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const renderTextSearch = () => {
    return (
      <div className={`search-form-textbox ${expanded ? 'expanded' : ''}`}>
        <div>
          <label>Latitude: </label>
          <input
            max={maxLatitude}
            min={minLatitude}
            required
            step={0.0001}
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <label>Longitude: </label>
          <input
            max={maxLongitude}
            min={minLongitude}
            required
            step={0.0001}
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.valueAsNumber)}
          />
        </div>
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className="search-form-container">
        <form onSubmit={search}>
          <SuburbSearchSlider
            currentPosition={[latitude, longitude]}
            onSlide={handleSetPosition}
          />
          {renderTextSearch()}
          <button className="button" type="submit">
            Suburb Search
          </button>
        </form>
        <IconButton onClick={() => setExpanded(!expanded)}>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
    );
  };
  return (
    <div className={`search-container ${suburbName !== '' ? 'top' : ''}`}>
      {renderSearch()}
    </div>
  );
};

export default SuburbSearch;

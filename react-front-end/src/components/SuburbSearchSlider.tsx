import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import { SearchLimit } from '../lib/contants';
import { Position } from '../lib/types';

type dataFromProps = {
  onSlide: (position: Position) => void;
  currentPosition: Position;
};

export default function SuburbSearchSlider({
  currentPosition,
  onSlide,
}: dataFromProps) {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = SearchLimit;

  const [position, setPosition] = useState<Position>(currentPosition);

  useEffect(() => {
    setPosition(currentPosition);
    console.log('currentPosition', position);
  }, [currentPosition]);

  const [latitude, longitude] = position;
  const handleChange = (newPosition: Position) => {
    setPosition(newPosition);

    onSlide(position);
  };
  const handleChangeLatitude = (e: Event, newValue: number | number[]) => {
    handleChange([newValue as number, longitude]);
  };
  const handleChangeLongitude = (e: Event, newValue: number | number[]) => {
    handleChange([latitude, newValue as number]);
  };

  return (
    <>
      <div>
        <label htmlFor="latitude">Latitude: </label>
        <Box sx={{ width: 400 }}>
          <Slider
            color="success"
            max={maxLatitude}
            min={minLatitude}
            name="latitude"
            size="small"
            step={0.00001}
            // defaultValue={defaultLatitude}
            aria-label="Small"
            valueLabelDisplay="auto"
            value={latitude}
            onChange={handleChangeLatitude}
          />
        </Box>
      </div>
      <div>
        <label htmlFor="longitude">Longitude: </label>
        <Box sx={{ width: 400 }}>
          <Slider
            color="success"
            max={maxLongitude}
            min={minLongitude}
            name="longitude"
            size="small"
            step={0.00001}
            // defaultValue={defualtLongitude}
            aria-label="Small"
            valueLabelDisplay="auto"
            value={longitude}
            onChange={handleChangeLongitude}
          />
        </Box>
      </div>
    </>
  );
}

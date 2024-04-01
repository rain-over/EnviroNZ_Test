import Slider from '@mui/material/Slider';
import { useMemo, useState } from 'react';
import { debounce } from 'throttle-debounce-ts';
import { step } from '../lib/contants';
import { Axis, Position } from '../lib/types';
import { capitalize, is_numberInRange } from '../lib/utils';

type dataFromProps = {
  onSlide: (position: Position) => void;
  sliderProps: {
    defaultPosition: Position;
    min: { [key in Axis]: number };
    max: { [key in Axis]: number };
  };
};

type searchInputError = {
  latitude: boolean;
  longitude: boolean;
};

export default function SuburbSearchSlider({
  onSlide,
  sliderProps,
}: dataFromProps) {
  const {
    defaultPosition: [defaultLatitude, defaultLongitude],
    max,
    min,
  } = sliderProps;

  const [latitude, setLatitude] = useState<number>(defaultLatitude);
  const [longitude, setLongitude] = useState<number>(defaultLongitude);

  const [errors, setErrors] = useState<searchInputError>({
    latitude: false,
    longitude: false,
  });

  const debouncedSlide = useMemo(() => debounce(300, onSlide), [onSlide]);

  const handleChange = (newValue: number, axis: Axis) => {
    const hasError = !is_numberInRange(newValue, min[axis], max[axis]);

    setErrors({
      ...errors,
      [axis]: hasError,
    });

    if (hasError) {
      return;
    } else {
      axis === 'latitude' ? setLatitude(newValue) : setLongitude(newValue);
      debouncedSlide([
        axis === 'latitude' ? newValue : latitude,
        axis === 'longitude' ? newValue : longitude,
      ]);
    }
  };

  const renderField = (
    axis: Axis,
    max: number,
    min: number,
    value: number,
    onChange: (value: number, axis: Axis) => void
  ) => {
    return (
      <fieldset>
        <legend>{capitalize(axis)}: </legend>
        <div>
          <Slider
            aria-label={`${axis}-slider`}
            color="success"
            max={max}
            min={min}
            name={`${axis}-slider`}
            size="small"
            step={step}
            style={{ width: 420 }}
            value={value}
            onChange={(e, latitude) => onChange(latitude as number, axis)}
          />
          <input
            aria-label={`${axis}-input`}
            max={max}
            min={min}
            name={`${axis}-input`}
            required
            step={step}
            type="number"
            value={value}
            onChange={(e) => onChange(+e.target.value, axis)}
          />
        </div>
        {errors[axis] && (
          <span
            aria-label={`${axis}-range-error`}
            className="search-slider-validation"
          >
            Value must be between {min} to {max}
          </span>
        )}
      </fieldset>
    );
  };

  return (
    <>
      <div className="search-slider">
        {renderField(
          'latitude',
          max.latitude,
          min.latitude,
          latitude,
          handleChange
        )}
        {renderField(
          'longitude',
          max.longitude,
          min.longitude,
          longitude,
          handleChange
        )}
      </div>
    </>
  );
}

import { fireEvent, render, screen } from '@testing-library/react';
import { SearchLimit, defaultPosition } from '../../lib/contants';
import SuburbSearchSlider from '../SuburbSearchSlider';

const { minLatitude, maxLatitude, minLongitude, maxLongitude } = SearchLimit;

jest.useFakeTimers();
describe('SuburbSearchSlider component', () => {
  const mockOnSlide = jest.fn();
  const sliderProps = {
    defaultPosition,
    min: { latitude: minLatitude, longitude: minLongitude },
    max: { latitude: maxLatitude, longitude: maxLongitude },
  };

  beforeEach(() => {
    mockOnSlide.mockClear();
  });
  test('renders correctly', () => {
    render(
      <SuburbSearchSlider onSlide={mockOnSlide} sliderProps={sliderProps} />
    );
    expect(screen.getByLabelText('latitude-slider')).toBeInTheDocument();
    expect(screen.getByLabelText('latitude-input')).toBeInTheDocument();
    expect(screen.getByLabelText('longitude-slider')).toBeInTheDocument();
    expect(screen.getByLabelText('longitude-input')).toBeInTheDocument();
  });

  test('calls onSlide when slider changes  with correct values', () => {
    render(
      <SuburbSearchSlider onSlide={mockOnSlide} sliderProps={sliderProps} />
    );

    const latitudeSlider = screen.getByLabelText(
      'latitude-slider'
    ) as HTMLInputElement;
    const longitudeSlider = screen.getByLabelText(
      'longitude-slider'
    ) as HTMLInputElement;

    fireEvent.change(latitudeSlider, { target: { value: -36.5 } });
    jest.runAllTimers();
    fireEvent.change(longitudeSlider, { target: { value: 175 } });
    jest.runAllTimers();

    expect(mockOnSlide).toHaveBeenCalledTimes(2);
    expect(latitudeSlider.value).toBe('-36.5');
    expect(longitudeSlider.value).toBe('175');
  });

  test('display error when input changes with incorrect values', () => {
    render(
      <SuburbSearchSlider onSlide={mockOnSlide} sliderProps={sliderProps} />
    );

    const latitudeInput = screen.getByLabelText(
      'latitude-input'
    ) as HTMLInputElement;
    const longitudeInput = screen.getByLabelText(
      'longitude-input'
    ) as HTMLInputElement;

    fireEvent.change(latitudeInput, { target: { value: -35.0 } });
    jest.runAllTimers();

    fireEvent.change(longitudeInput, { target: { value: 176 } });
    jest.runAllTimers();

    expect(screen.getByLabelText('latitude-range-error')).toBeInTheDocument();
    expect(screen.getByLabelText('longitude-range-error')).toBeInTheDocument();
  });
});

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { SliderTypeMap } from '@mui/material';
import '@testing-library/jest-dom';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('@mui/material/Slider', () => (props: SliderTypeMap['props']) => {
  const { color, name, min, max, step, value, onChange } = props;
  const event = {} as Event;

  return (
    <input
      id={name}
      aria-label={name}
      type="range"
      color={color}
      name={name}
      min={min}
      max={max}
      step={step as number}
      value={value as number}
      onChange={(e) => {
        onChange && onChange(event, +e.target.value, 0);
      }}
    />
  );
});

jest.mock('react-leaflet', () => ({
  MapContainer: ({
    children,
    center,
    zoom,
  }: {
    children: React.ReactNode;
    center: [number, number];
    zoom: number;
  }) => (
    <div data-testid="map-container">
      <div data-testid="map-center">{center}</div>
      <div data-testid="map-zoom">{zoom}</div>
      {children}
    </div>
  ),
  Marker: ({
    children,
    position,
    icon,
  }: {
    children: React.ReactNode;
    position: [number, number];
    icon: string;
  }) => (
    <div data-testid="marker" data-position={position} data-icon={icon}>
      {children}
    </div>
  ),
  Polyline: ({
    positions,
    color,
  }: {
    positions: [number, number][];
    color: string;
  }) => (
    <div
      data-testid="polyline"
      data-positions={JSON.stringify(positions)}
      data-color={color}
    ></div>
  ),
  TileLayer: () => <div data-testid="tile-layer"></div>,
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip">{children}</div>
  ),
}));

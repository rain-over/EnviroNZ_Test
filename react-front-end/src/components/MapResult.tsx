import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
} from 'react-leaflet';
import { useActiveLocationContext } from '../context/active-location-context';
import { getDistanceBetweenMarkers } from '../lib/utils';

const markerIcon = new Icon({
  iconUrl: 'marker-icon.png',
  iconSize: [35, 35], // size of the icon
  iconAnchor: [18, 35],
});
const searchedMarkerIcon = new Icon({
  iconUrl: 'marker-green.png',
  iconSize: [35, 35], // size of the icon
  iconAnchor: [18, 35],
});

const MapResult = () => {
  const {
    activeLocation: {
      result: { latitude, longitude, suburbName },
      searched: position,
    },
  } = useActiveLocationContext();

  const renderMap = () => {
    const [searchedLatitude, searchedLongitude] = position;
    const distance = getDistanceBetweenMarkers(
      searchedLatitude,
      searchedLongitude,
      latitude,
      longitude
    );

    return (
      <MapContainer
        key={latitude.toString() + longitude + toString()}
        center={[latitude, longitude]}
        zoom={12}
        style={{ height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={searchedMarkerIcon}>
          <Tooltip offset={[10, 0]} direction="right" permanent>
            {`[${searchedLatitude}, ${searchedLongitude}]`}
          </Tooltip>
        </Marker>
        <Marker position={[latitude, longitude]} icon={markerIcon}>
          <Tooltip offset={[10, 0]} direction="right" permanent>
            {suburbName}
          </Tooltip>
        </Marker>

        <Polyline positions={[position, [latitude, longitude]]} color="blue">
          <Tooltip offset={[10, 0]} direction="right">
            {`${distance.toFixed(2)} km to closest suburb`}
          </Tooltip>
        </Polyline>
      </MapContainer>
    );
  };

  return <div className="map-container">{renderMap()}</div>;
};

export default MapResult;

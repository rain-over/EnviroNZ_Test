import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useActiveLocationContext } from '../context/active-location-context';

const markerIcon = new Icon({
  iconUrl: 'marker-icon.png',
  iconSize: [35, 35], // size of the icon
});

const MapResult = () => {
  const {
    activeLocation: { latitude, longitude, suburbName },
  } = useActiveLocationContext();

  const renderMap = () => {
    return (
      <MapContainer
        key={latitude.toString() + longitude + toString()}
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]} icon={markerIcon}>
          <Tooltip offset={[10, 0]} direction="right" permanent>
            {suburbName}
          </Tooltip>
        </Marker>
      </MapContainer>
    );
  };

  return <div className="map-container">{renderMap()}</div>;
};

export default MapResult;

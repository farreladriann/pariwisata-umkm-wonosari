'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons for different types
const umkmIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pariwisataIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationData {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type?: 'umkm' | 'pariwisata';
}

interface MapComponentProps {
  locationData: LocationData[];
}

export default function MapComponent({ locationData }: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
        <div className="text-gray-600">Loading map...</div>
      </div>
    );
  }

  // Calculate center point from all coordinates
  const centerLat = locationData.reduce((sum, item) => sum + item.coordinates[1], 0) / locationData.length;
  const centerLng = locationData.reduce((sum, item) => sum + item.coordinates[0], 0) / locationData.length;

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locationData.map((location, index) => (
          <Marker
            key={index}
            position={[location.coordinates[1], location.coordinates[0]]} // [latitude, longitude]
            icon={location.type === 'pariwisata' ? pariwisataIcon : umkmIcon}
          >
            <Tooltip permanent direction="top" offset={[0, -10]} className="marker-tooltip">
              <span className="font-medium capitalize">{location.name}</span>
            </Tooltip>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-lg capitalize">{location.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    location.type === 'pariwisata' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {location.type === 'pariwisata' ? 'Objek Wisata' : 'UMKM'}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Koordinat: {location.coordinates[1].toFixed(6)}, {location.coordinates[0].toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

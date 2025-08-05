'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface UMKMData {
  name: string;
  coordinates: [number, number, number]; // [longitude, latitude, altitude]
}

interface MapComponentProps {
  umkmData: UMKMData[];
}

export default function MapComponent({ umkmData }: MapComponentProps) {
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
  const centerLat = umkmData.reduce((sum, item) => sum + item.coordinates[1], 0) / umkmData.length;
  const centerLng = umkmData.reduce((sum, item) => sum + item.coordinates[0], 0) / umkmData.length;

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
        {umkmData.map((umkm, index) => (
          <Marker
            key={index}
            position={[umkm.coordinates[1], umkm.coordinates[0]]} // [latitude, longitude]
          >
                        <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-lg capitalize">{umkm.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Koordinat: {umkm.coordinates[1].toFixed(6)}, {umkm.coordinates[0].toFixed(6)}
                </p>
                <p className="text-xs text-gray-500">
                  Altitude: {umkm.coordinates[2].toFixed(1)}m
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';
import LocationDataList from '@/components/LocationDataList';
import umkmData from '../../koordinat-umkm.json';
import pariwisataData from '../../koordinat-pariwisata.json';

// Type untuk data lokasi
interface LocationData {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type?: 'umkm' | 'pariwisata';
}

// Cast data JSON ke tipe yang benar dan tambahkan type
const typedUmkmData: LocationData[] = umkmData.map(item => ({ 
  ...item, 
  coordinates: item.coordinates as [number, number],
  type: 'umkm' as const 
}));
const typedPariwisataData: LocationData[] = pariwisataData.map(item => ({ 
  ...item, 
  coordinates: item.coordinates as [number, number],
  type: 'pariwisata' as const 
}));

// Gabungkan semua data
const allLocationData: LocationData[] = [...typedUmkmData, ...typedPariwisataData];

// Dynamic import untuk MapComponent agar tidak error saat SSR
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
      <div className="text-gray-600">Loading map...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Peta UMKM & Pariwisata Wonosari
            </h1>
            <p className="text-lg text-gray-600">
              Direktori dan Peta Lokasi UMKM serta Objek Wisata di Wonosari
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Peta Lokasi UMKM & Pariwisata</h2>
              <MapComponent locationData={allLocationData} />
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-1">
            <LocationDataList locationData={allLocationData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Peta UMKM & Pariwisata Wonosari</p>
          <p className="text-gray-400">
            Mendukung pertumbuhan ekonomi lokal melalui digitalisasi UMKM dan promosi pariwisata
          </p>
        </div>
      </footer>
    </div>
  );
}

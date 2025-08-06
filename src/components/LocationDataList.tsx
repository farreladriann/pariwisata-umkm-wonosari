interface LocationData {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type?: 'umkm' | 'pariwisata';
}

interface LocationListProps {
  locationData: LocationData[];
}

export default function LocationDataList({ locationData }: LocationListProps) {
  const umkmCount = locationData.filter(item => item.type === 'umkm').length;
  const pariwisataCount = locationData.filter(item => item.type === 'pariwisata').length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar UMKM & Pariwisata Wonosari</h2>
      
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-md text-center">
          <p className="text-lg font-bold text-blue-800">{umkmCount}</p>
          <p className="text-sm text-blue-600">UMKM</p>
        </div>
        <div className="bg-green-50 p-3 rounded-md text-center">
          <p className="text-lg font-bold text-green-800">{pariwisataCount}</p>
          <p className="text-sm text-green-600">Objek Wisata</p>
        </div>
      </div>

      <div className="grid gap-3">
        {locationData.map((location, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800 capitalize">{location.name}</h4>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                location.type === 'pariwisata' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {location.type === 'pariwisata' ? 'Wisata' : 'UMKM'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              📍 {location.coordinates[1].toFixed(6)}, {location.coordinates[0].toFixed(6)}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-700">
          <strong>Total Lokasi:</strong> {locationData.length} ({umkmCount} UMKM, {pariwisataCount} Objek Wisata)
        </p>
      </div>
    </div>
  );
}

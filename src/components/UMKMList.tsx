interface UMKMData {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface UMKMListProps {
  umkmData: UMKMData[];
}

export default function UMKMList({ umkmData }: UMKMListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar UMKM Wonosari</h2>
      <div className="grid gap-3">
        {umkmData.map((umkm, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors">
            <h4 className="font-medium text-gray-800 capitalize">{umkm.name}</h4>
            <p className="text-sm text-gray-600 mt-1">
              📍 {umkm.coordinates[1].toFixed(6)}, {umkm.coordinates[0].toFixed(6)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          <strong>Total UMKM:</strong> {umkmData.length} usaha
        </p>
      </div>
    </div>
  );
}

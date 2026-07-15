import { Map } from 'lucide-react';

const Regions = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Master Data Wilayah</h1>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500">
        <Map className="w-12 h-12 mx-auto text-slate-300 mb-4" />
        <p className="text-lg font-medium">Data Provinsi, Kabupaten, Kecamatan, Desa</p>
        <p className="text-sm mt-1">Manajemen data wilayah hierarkis</p>
      </div>
    </div>
  );
};

export default Regions;

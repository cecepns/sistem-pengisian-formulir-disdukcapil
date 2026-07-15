import { FileBadge } from 'lucide-react';

const Requirements = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Master Persyaratan Layanan</h1>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500">
        <FileBadge className="w-12 h-12 mx-auto text-slate-300 mb-4" />
        <p className="text-lg font-medium">Konfigurasi Persyaratan Dokumen</p>
        <p className="text-sm mt-1">Mengatur file apa saja yang wajib diupload untuk tiap layanan</p>
      </div>
    </div>
  );
};

export default Requirements;

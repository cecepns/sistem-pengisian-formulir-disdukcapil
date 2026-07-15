import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Pengaturan Aplikasi</h1>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500">
        <SettingsIcon className="w-12 h-12 mx-auto text-slate-300 mb-4" />
        <p className="text-lg font-medium">Pengaturan Umum</p>
        <p className="text-sm mt-1">Manajemen User dan Template PDF</p>
      </div>
    </div>
  );
};

export default Settings;

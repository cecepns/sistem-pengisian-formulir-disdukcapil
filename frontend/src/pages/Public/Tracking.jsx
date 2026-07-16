import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, FileText, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { request } from '../../utils/request';
import { API_ENDPOINTS } from '../../utils/endpoints';

const Tracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState(location.state?.tracking_number || '');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e?.preventDefault();
    if (!trackingNumber) return;

    setLoading(true);
    setError('');

    try {
      const res = await request.get(API_ENDPOINTS.SUBMISSIONS.TRACK(trackingNumber));
      if (res.success) {
        setResult(res.data);
      }
    } catch (err) {
      setError('Nomor pengajuan tidak ditemukan. Pastikan nomor yang dimasukkan benar.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto track if came from submit
  React.useEffect(() => {
    if (location.state?.tracking_number) {
      handleTrack();
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/')} className="inline-flex items-center text-slate-500 hover:text-slate-800 font-medium mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Beranda
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Lacak Pengajuan</h1>
            <p className="text-slate-600">Masukkan Nomor Pengajuan yang Anda dapatkan saat mendaftar.</p>
          </div>

          <form onSubmit={handleTrack} className="flex gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg font-medium tracking-wider uppercase"
                placeholder="DKP-..."
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !trackingNumber}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-sm disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? 'Mencari...' : 'Lacak'}
            </button>
          </form>

          {error && <p className="text-rose-500 text-center mt-4 font-medium">{error}</p>}
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2">
              <FileText className="text-primary-600" /> Hasil Pencarian
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Nomor Pengajuan</p>
                <p className="text-lg font-bold text-slate-900">{result.tracking_number}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Layanan</p>
                <p className="text-lg font-bold text-slate-900">{result.template_name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Nama Pemohon</p>
                <p className="text-lg font-bold text-slate-900">{result.applicant_name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Tanggal Masuk</p>
                <p className="text-lg font-bold text-slate-900">
                  {new Date(result.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-center">
              <p className="text-sm text-slate-500 font-medium mb-3">Status Saat Ini</p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg bg-amber-100 text-amber-800">
                <Clock className="w-6 h-6" />
                {result.status.replace('_', ' ').toUpperCase()}
              </div>
              <p className="text-slate-600 mt-4 text-sm">
                Berkas Anda sedang dalam antrean pengecekan oleh petugas Briojasa.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;

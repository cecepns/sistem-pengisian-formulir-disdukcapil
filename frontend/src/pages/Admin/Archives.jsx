import React, { useState, useEffect } from 'react';
import { request } from '../../utils/request';
import { API_ENDPOINTS } from '../../utils/endpoints';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

const Archives = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState('');
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    fetchArchives();
  }, [template]);

  const fetchTemplates = async () => {
    try {
      const res = await request.get(API_ENDPOINTS.TEMPLATES.LIST);
      if (res.success) {
        setTemplates(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArchives = async () => {
    setLoading(true);
    try {
      const res = await request.get(`${API_ENDPOINTS.SUBMISSIONS.ARCHIVES}${template ? `?template=${template}` : ''}`);
      if (res.success) {
        setSubmissions(res.data);
      }
    } catch (error) {
      toast.error('Gagal memuat data arsip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Arsip Manajemen Pengajuan</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          Export Excel
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Filter Jenis Dokumen:</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="">Semua Dokumen</option>
              {templates.map(t => (
                <option key={t.slug} value={t.slug}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Jenis Dokumen</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ket Kepemilikan</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">NIK</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Alamat</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Orang Tua</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-2"></div>
                    <p>Memuat data...</p>
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    Tidak ada data arsip yang ditemukan.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(sub.tanggal).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">{sub.jenis_dokumen}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {sub.keterangan_kepemilikan || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{sub.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{sub.nik || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 max-w-[200px] truncate" title={sub.alamat}>{sub.alamat || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{sub.nama_orang_tua || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Archives;

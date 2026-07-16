import React, { useState, useEffect } from 'react';
import { request } from '../../utils/request';
import { API_ENDPOINTS } from '../../utils/endpoints';
import { Search, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const DailySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [template, setTemplate] = useState('akta-lahir');
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    fetchDailySubmissions();
  }, [date, template]);

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

  const fetchDailySubmissions = async () => {
    if (!template || !date) return;
    setLoading(true);
    try {
      const res = await request.get(`${API_ENDPOINTS.SUBMISSIONS.DAILY}?date=${date}&template=${template}`);
      if (res.success) {
        setSubmissions(res.data);
      }
    } catch (error) {
      toast.error('Gagal memuat data pengajuan harian');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    const text = submissions.map(sub => `${sub.applicant_name} - ${sub.nik || '-'}`).join('\n');
    navigator.clipboard.writeText(text);
    toast.success('Data disalin ke clipboard');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Daftar Pengajuan Harian</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Dokumen</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              {templates.map(t => (
                <option key={t.slug} value={t.slug}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700">Hasil (Nama - NIK)</label>
            <button
              onClick={copyResult}
              disabled={submissions.length === 0}
              className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              Copy Semua
            </button>
          </div>
          <textarea
            readOnly
            className="w-full h-64 p-4 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={
              loading ? 'Memuat data...' :
              submissions.length > 0 
                ? submissions.map(sub => `${sub.applicant_name} - ${sub.nik || '-'}`).join('\n')
                : 'Tidak ada data pengajuan harian'
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default DailySubmissions;

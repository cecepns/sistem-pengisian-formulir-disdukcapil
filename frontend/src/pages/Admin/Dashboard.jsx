import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { request } from '../../utils/request';
import { API_ENDPOINTS } from '../../utils/endpoints';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ stats: null, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await request.get(API_ENDPOINTS.DASHBOARD.STATS);
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        toast.error('Gagal mengambil data dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { name: 'Total Pengajuan', value: data.stats?.total || 0, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Menunggu Verifikasi', value: data.stats?.menunggu || 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Selesai Diproses', value: data.stats?.selesai || 0, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Ditolak / Revisi', value: data.stats?.ditolak || 0, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-100' },
  ];

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-slate-500">Memuat Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Submissions Table Placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Pengajuan Terbaru</h3>
          <button onClick={() => navigate('/admin/submissions')} className="text-primary-600 hover:text-primary-700 text-sm font-medium">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">No. Pengajuan</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Layanan</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pemohon</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.recent.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500 italic">Belum ada pengajuan</td>
                </tr>
              ) : (
                data.recent.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.tracking_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.template_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.applicant_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.status === 'selesai' ? 'bg-emerald-100 text-emerald-800' :
                        row.status === 'ditolak' ? 'bg-rose-100 text-rose-800' :
                        row.status === 'revisi' ? 'bg-orange-100 text-orange-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {row.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:text-primary-900 font-medium cursor-pointer" onClick={() => navigate(`/admin/submissions/${row.id}/edit`)}>
                      Detail
                    </td>
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

export default Dashboard;

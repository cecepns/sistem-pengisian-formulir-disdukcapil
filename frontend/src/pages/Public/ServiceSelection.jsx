import { ArrowLeft, ChevronRight, FileText, Map, UserMinus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ServiceSelection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'akta-lahir',
      title: 'Pembuatan Akta Kelahiran',
      description: 'Pengajuan pembuatan Akta Kelahiran baru bagi anak yang baru lahir.',
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50 border-blue-100 hover:border-blue-300',
    },
    {
      id: 'surat-pindah',
      title: 'Surat Keterangan Pindah',
      description: 'Pengajuan surat pindah antar kabupaten/kota/provinsi.',
      icon: <Map className="w-8 h-8 text-emerald-500" />,
      color: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300',
    },
    {
      id: 'akta-kematian',
      title: 'Pembuatan Akta Kematian',
      description: 'Pelaporan pencatatan sipil untuk kematian penduduk.',
      icon: <UserMinus className="w-8 h-8 text-rose-500" />,
      color: 'bg-rose-50 border-rose-100 hover:border-rose-300',
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Beranda
        </Link>
        
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Pilih Jenis Layanan</h1>
          <p className="text-lg text-slate-600">Pilih formulir administrasi kependudukan yang ingin Anda urus.</p>
        </div>

        <div className="grid gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => navigate(`/form/${service.id}`)}
              className={`flex items-center p-6 bg-white border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group ${service.color}`}
            >
              <div className="flex-shrink-0 mr-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  {service.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all shadow-sm">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;

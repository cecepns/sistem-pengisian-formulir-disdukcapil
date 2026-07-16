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

        <div className="grid gap-4 sm:gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => navigate(`/form/${service.id}`)}
              className={`flex flex-col sm:flex-row items-start sm:items-center p-5 sm:p-6 gap-4 sm:gap-6 bg-white border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group ${service.color} relative overflow-hidden`}
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  {service.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0 pr-8 sm:pr-0">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors leading-tight sm:leading-normal">{service.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{service.description}</p>
              </div>
              <div className="absolute right-4 top-4 sm:static sm:flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all shadow-sm">
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
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

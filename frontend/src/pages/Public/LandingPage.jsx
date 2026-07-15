import { ArrowRight, FileText, FileBadge, FileArchive, CheckCircle, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FileBadge className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-slate-800 tracking-tight">Form Dukcapil</span>
            </div>
            <div className="flex gap-4">
              <Link to="/tracking" className="text-slate-600 hover:text-primary-600 font-medium px-3 py-2 transition-colors">
                Lacak Pengajuan
              </Link>
              <Link to="/layanan" className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-full font-medium transition-colors">
                Buat Pengajuan
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6">
              Layanan Administrasi Digital
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              Urus Dokumen Kependudukan Kini <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-sky-400">Lebih Mudah</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Sistem digital untuk membantu masyarakat mengisi formulir administrasi Disdukcapil secara online tanpa perlu antre panjang.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/layanan" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 hover:-translate-y-1">
                Mulai Pengajuan <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/tracking" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:-translate-y-1">
                Lacak Status
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Steps */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Cara Kerja Sistem</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Tiga langkah mudah untuk menyelesaikan pengurusan dokumen kependudukan Anda.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8 text-white" />,
                title: "1. Pilih Layanan & Isi Form",
                desc: "Pilih jenis layanan yang dibutuhkan dan isi formulir secara lengkap secara online.",
                color: "bg-blue-500"
              },
              {
                icon: <Smartphone className="w-8 h-8 text-white" />,
                title: "2. Upload Berkas",
                desc: "Unggah dokumen persyaratan yang diminta melalui perangkat Anda.",
                color: "bg-indigo-500"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-white" />,
                title: "3. Proses Verifikasi",
                desc: "Admin akan memverifikasi dan menerbitkan dokumen resmi yang siap dicetak.",
                color: "bg-emerald-500"
              }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <FileBadge className="h-10 w-10 text-primary-500 mb-4" />
          <p className="mb-2">Sistem Informasi Biro Jasa Administrasi Kependudukan</p>
          <p className="text-sm">© {new Date().getFullYear()} Form Dukcapil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

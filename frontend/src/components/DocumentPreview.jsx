import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { X, Download, Printer } from 'lucide-react';
import toast from 'react-hot-toast';
import AktaLahirPDF from './Templates/AktaLahirPDF';
import SuratPindahPDF from './Templates/SuratPindahPDF';
import AktaKematianPDF from './Templates/AktaKematianPDF';

const DocumentPreview = ({ submission, fields, onClose }) => {
  const printRef = useRef();

  const handleDownloadPDF = () => {
    toast.success('Silakan pilih tujuan "Save as PDF" pada dialog print browser Anda.', { duration: 4000, id: 'pdf' });
    handlePrint();
  };

  const handlePrint = () => {
    // Collect all stylesheets to ensure Tailwind works in the print window
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(style => style.outerHTML)
      .join('');

    const printContent = printRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print - ${submission.tracking_number}</title>
          ${styles}
          <style>
            @media print {
              @page { size: A4 portrait; margin: 0; }
              body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; }
              .page-break { page-break-after: always; break-after: page; }
            }
          </style>
        </head>
        <body class="bg-white">
          ${printContent}
          <script>
            // Wait for styles to apply before printing
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      
      {/* Modal Container */}
      <div className="bg-slate-100 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Options */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10">
          <div className="w-full flex justify-between items-center sm:w-auto">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Preview Dokumen</h3>
              <p className="text-sm text-slate-500">#{submission.tracking_number}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors sm:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 border border-transparent rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm text-sm"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button 
              onClick={onClose}
              className="hidden sm:block p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 bg-slate-100">
          <div className="w-max mx-auto">
            <div ref={printRef}>
            {(submission.template_name === 'Akta Kelahiran' || submission.template_name === 'Akta Lahir') && (
              <AktaLahirPDF submission={submission} fields={fields} />
            )}
            {submission.template_name === 'Surat Pindah' && (
              <SuratPindahPDF submission={submission} fields={fields} />
            )}
            {submission.template_name === 'Akta Kematian' && (
              <AktaKematianPDF submission={submission} fields={fields} />
            )}
            
            {/* Fallback if no specific template exists */}
            {(submission.template_name !== 'Akta Kelahiran' && 
              submission.template_name !== 'Akta Lahir' && 
              submission.template_name !== 'Surat Pindah' &&
              submission.template_name !== 'Akta Kematian') && (
              <div className="bg-white shadow-md w-[210mm] min-h-[297mm] px-12 py-16 mx-auto" style={{ fontFamily: "'Times New Roman', Times, serif", color: '#000' }}>
                <div className="w-full h-full">
                  {/* Kop Surat */}
                  <div className="text-center border-b-2 border-black pb-4 mb-6">
                    <h1 className="text-xl font-bold uppercase tracking-wide m-0">PEMERINTAH KABUPATEN/KOTA</h1>
                    <h3 className="text-lg font-medium m-0">DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL</h3>
                  </div>

                  {/* Info Header */}
                  <table className="w-full mb-8 text-sm">
                    <tbody>
                      <tr>
                        <td className="font-bold w-40 py-1">No. Pengajuan</td>
                        <td>: {submission.tracking_number}</td>
                      </tr>
                      <tr>
                        <td className="font-bold py-1">Jenis Layanan</td>
                        <td>: {submission.template_name}</td>
                      </tr>
                      <tr>
                        <td className="font-bold py-1">Nama Pemohon</td>
                        <td>: {submission.applicant_name}</td>
                      </tr>
                      <tr>
                        <td className="font-bold py-1">Tgl. Pengajuan</td>
                        <td>: {new Date(submission.created_at).toLocaleDateString('id-ID')}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mb-4">
                    <h4 className="text-base font-bold mb-2 border-b border-gray-300 pb-1">Rincian Data:</h4>
                  </div>

                  {/* Data Form */}
                  <table className="w-full border-collapse border border-black text-sm mb-12">
                    <tbody>
                      {fields.length > 0 ? fields.map((f, idx) => (
                        <tr key={idx}>
                          <td className="border border-black p-2 font-bold w-2/5 bg-gray-50 uppercase text-xs">
                            {f.field_name.replace(/_/g, ' ')}
                          </td>
                          <td className="border border-black p-2">
                            {f.field_value}
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="2" className="border border-black p-4 text-center italic text-gray-500">Tidak ada data rincian</td></tr>
                      )}
                    </tbody>
                  </table>

                  {/* Footer / Signature */}
                  <div className="text-right mt-16 text-sm">
                    <p>................., {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className="inline-block text-center w-48 mt-4">
                      <p className="mb-20">Pemohon,</p>
                      <p className="font-bold underline uppercase">{submission.applicant_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>

      </div>
    </div>
  );
};

export default DocumentPreview;

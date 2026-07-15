import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request } from '../../utils/request';
import { API_ENDPOINTS } from '../../utils/endpoints';
import { ChevronRight, ChevronLeft, Check, FileText, X } from 'lucide-react';
import toast from 'react-hot-toast';

const FormWizard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [applicantInfo, setApplicantInfo] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Determine steps dynamically from template
  const dynamicSteps = template?.fields ? [...new Set(template.fields.map(f => f.step_number))].sort() : [2];
  const maxStep = Math.max(...dynamicSteps, 2) + 2; // Step 1 is always Pemohon, +1 for Review
  
  const defaultSteps = [
    { number: 1, title: 'Data Pemohon' },
    ...dynamicSteps.map(num => ({ 
      number: num, 
      title: template?.fields?.find(f => f.step_number === num)?.step_title || `Step ${num}` 
    })),
    { number: maxStep - 1, title: 'Upload Berkas' },
    { number: maxStep, title: 'Review & Kirim' }
  ];

  const renderDynamicField = (field) => {
    switch(field.field_type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <div key={field.field_name} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">{field.field_label} {field.is_required && '*'}</label>
            <input 
              type={field.field_type} 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData[field.field_name] || ''}
              onChange={(e) => setFormData({...formData, [field.field_name]: e.target.value})}
              required={!!field.is_required}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={field.field_name} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">{field.field_label} {field.is_required && '*'}</label>
            <textarea 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData[field.field_name] || ''}
              onChange={(e) => setFormData({...formData, [field.field_name]: e.target.value})}
              rows="3"
              required={!!field.is_required}
            ></textarea>
          </div>
        );
      case 'select':
        const opts = field.options ? JSON.parse(field.options) : [];
        return (
          <div key={field.field_name} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">{field.field_label} {field.is_required && '*'}</label>
            <select 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData[field.field_name] || ''}
              onChange={(e) => setFormData({...formData, [field.field_name]: e.target.value})}
              required={!!field.is_required}
            >
              <option value="">-- Pilih --</option>
              {opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        );
      case 'radio':
        const radioOpts = field.options ? JSON.parse(field.options) : [];
        return (
          <div key={field.field_name} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">{field.field_label} {field.is_required && '*'}</label>
            <div className="flex flex-wrap gap-4">
              {radioOpts.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name={field.field_name}
                    value={opt}
                    checked={formData[field.field_name] === opt}
                    onChange={(e) => setFormData({...formData, [field.field_name]: e.target.value})}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-slate-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'dynamic_table':
        let columns = [];
        try { columns = field.options ? JSON.parse(field.options) : []; } catch(e){}
        
        let tableData = [];
        try { 
          if(formData[field.field_name]) {
            tableData = typeof formData[field.field_name] === 'string' ? JSON.parse(formData[field.field_name]) : formData[field.field_name];
          }
        } catch(e) {}
        if (!Array.isArray(tableData)) tableData = [];

        const handleAddRow = () => {
          const newRow = {};
          columns.forEach(col => newRow[col.name] = '');
          const newData = [...tableData, newRow];
          setFormData({...formData, [field.field_name]: JSON.stringify(newData)});
        };

        const handleRowChange = (index, colName, value) => {
          const newData = [...tableData];
          newData[index][colName] = value;
          setFormData({...formData, [field.field_name]: JSON.stringify(newData)});
        };

        const handleRemoveRow = (index) => {
          const newData = tableData.filter((_, i) => i !== index);
          setFormData({...formData, [field.field_name]: JSON.stringify(newData)});
        };

        return (
          <div key={field.field_name} className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">{field.field_label} {field.is_required && '*'}</label>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-700 w-12 text-center">No</th>
                    {columns.map(col => (
                      <th key={col.name} className="px-4 py-3 font-medium text-slate-700">{col.label}</th>
                    ))}
                    <th className="px-4 py-3 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length === 0 ? (
                    <tr><td colSpan={columns.length + 2} className="px-4 py-8 text-center text-slate-500 italic">Belum ada data</td></tr>
                  ) : (
                    tableData.map((row, index) => (
                      <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-2 text-center text-slate-500">{index + 1}</td>
                        {columns.map(col => (
                          <td key={col.name} className="px-4 py-2">
                            <input 
                              type={col.type || 'text'}
                              className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[120px]"
                              value={row[col.name] || ''}
                              onChange={(e) => handleRowChange(index, col.name, e.target.value)}
                              required={!!field.is_required}
                            />
                          </td>
                        ))}
                        <td className="px-4 py-2 text-center">
                          <button type="button" onClick={() => handleRemoveRow(index)} className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50" title="Hapus">
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button type="button" onClick={handleAddRow} className="mt-3 text-sm flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded hover:bg-primary-50 transition-colors">
              + Tambah Data
            </button>
          </div>
        );
      default: return null;
    }
  };

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await request.get(API_ENDPOINTS.TEMPLATES.DETAIL(slug));
        if (res.success) setTemplate(res.data);
      } catch (error) {
        // Fallback for demo
        setTemplate({
          id: 1,
          name: slug === 'akta-lahir' ? 'Akta Kelahiran' : slug === 'surat-pindah' ? 'Surat Pindah' : 'Akta Kematian',
          slug: slug
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [slug]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, maxStep));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        template_id: template.id,
        applicant_name: applicantInfo.name,
        applicant_phone: applicantInfo.phone,
        fields: Object.keys(formData).map(key => ({
          field_name: key,
          field_value: formData[key]
        }))
      };

      const res = await request.post(API_ENDPOINTS.SUBMISSIONS.CREATE, payload);
      if (res.success) {
        toast.success('Pengajuan berhasil dibuat!');
        navigate('/tracking', { state: { tracking_number: res.data.tracking_number } });
      }
    } catch (error) {
      toast.error('Gagal mengirim pengajuan. Coba lagi.');
      // Mock success for demo if DB is unconfigured
      setTimeout(() => {
        toast.success('Pengajuan (Mock) berhasil dibuat!');
        navigate('/tracking', { state: { tracking_number: `DKP-2026-${Math.floor(Math.random()*1000)}` } });
      }, 1000);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat Form...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{template?.name}</h1>
          <p className="text-slate-600">Lengkapi data berikut dengan benar.</p>
        </div>

        {/* Stepper */}
        <div className="mb-8 relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-200">
            <div style={{ width: `${(currentStep / maxStep) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-500"></div>
          </div>
          
          {/* Desktop Stepper */}
          <div className="hidden md:flex justify-between text-xs font-medium text-slate-500 px-1">
            {defaultSteps.map(step => (
              <span key={step.number} className={currentStep >= step.number ? 'text-primary-600' : ''}>
                {step.title}
              </span>
            ))}
          </div>
          
          {/* Mobile Stepper */}
          <div className="md:hidden text-center text-sm font-bold text-primary-600 mt-2">
            Langkah {currentStep} dari {maxStep}: {defaultSteps.find(s => s.number === currentStep)?.title}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Informasi Kontak Pemohon</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap Pemohon</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={applicantInfo.name}
                  onChange={(e) => setApplicantInfo({...applicantInfo, name: e.target.value})}
                  placeholder="Masukkan nama lengkap..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp Aktif</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={applicantInfo.phone}
                  onChange={(e) => setApplicantInfo({...applicantInfo, phone: e.target.value})}
                  placeholder="081234567890"
                />
                <p className="text-xs text-slate-500 mt-1">Status pengajuan akan dikirimkan ke nomor ini.</p>
              </div>
            </div>
          )}

          {/* Dynamic Form Steps */}
          {dynamicSteps.includes(currentStep) && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">
                {template.fields.find(f => f.step_number === currentStep)?.step_title}
              </h2>
              {template.fields.filter(f => f.step_number === currentStep).map(renderDynamicField)}
            </div>
          )}

          {/* Upload Berkas */}
          {currentStep === maxStep - 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Upload Persyaratan</h2>
              
              {template?.requirements && template.requirements.length > 0 ? (
                template.requirements.map(req => (
                  <div key={req.id} className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 p-3 rounded-lg shrink-0"><FileText className="w-6 h-6 text-slate-500" /></div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">{req.name}</p>
                        <p className="text-xs text-slate-500">Wajib diupload (Max 2MB)</p>
                      </div>
                    </div>
                    <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 w-full sm:w-auto">Upload</button>
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50">
                  <FileText className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                  <p className="text-sm font-medium text-slate-700 mb-1">Upload Dokumen Pendukung (Jika ada)</p>
                  <p className="text-xs text-slate-500 mb-4">Format JPG, PNG, PDF max 2MB</p>
                  <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Pilih File</button>
                </div>
              )}
            </div>
          )}

          {currentStep === maxStep && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Review Pengajuan</h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Pastikan data yang Anda masukkan sudah benar. Setelah dikirim, Anda tidak dapat mengubah data sampai Admin mereview.
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
            <button 
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${currentStep === 1 ? 'opacity-0 cursor-default' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Kembali</span>
            </button>
            
            {currentStep < maxStep ? (
              <button 
                onClick={handleNext}
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 sm:px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Lanjut <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 sm:px-8 py-2.5 rounded-lg font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 text-sm sm:text-base"
              >
                {submitting ? 'Mengirim...' : 'Kirim'} <Check className="w-5 h-5 shrink-0" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FormWizard;

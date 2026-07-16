import React, { useState, useEffect } from 'react';
import { request } from '../../utils/request';
import { API_ENDPOINTS } from '../../utils/endpoints';
import { FileBadge, Save, ChevronDown, ChevronUp, X } from 'lucide-react';
import toast from 'react-hot-toast';

const FieldGroup = ({ title, fields, renderDynamicField }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="font-bold text-slate-800">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      
      {isOpen && (
        <div className="p-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-in fade-in slide-in-from-top-2">
          {fields.map(renderDynamicField)}
        </div>
      )}
    </div>
  );
};

const AdminFormCreate = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [applicantInfo, setApplicantInfo] = useState({ name: '', phone: '', keterangan_kepemilikan: '' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await request.get(API_ENDPOINTS.TEMPLATES.LIST);
        if (res.success) {
          setTemplates(res.data);
          
          const params = new URLSearchParams(window.location.search);
          const slug = params.get('template');
          if (slug) {
            const found = res.data.find(t => t.slug === slug);
            if (found) {
              setSelectedTemplateId(found.id.toString());
              setLoading(true);
              const detailRes = await request.get(API_ENDPOINTS.TEMPLATES.DETAIL(slug));
              if (detailRes.success) setSelectedTemplate(detailRes.data);
              setLoading(false);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTemplates();
  }, []);

  const handleTemplateChange = async (e) => {
    const id = e.target.value;
    setSelectedTemplateId(id);
    setFormData({}); // Reset form
    if (!id) {
      setSelectedTemplate(null);
      return;
    }

    setLoading(true);
    try {
      const template = templates.find(t => t.id === parseInt(id));
      const res = await request.get(API_ENDPOINTS.TEMPLATES.DETAIL(template.slug));
      if (res.success) {
        setSelectedTemplate(res.data);
      }
    } catch (error) {
      toast.error('Gagal memuat template');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        template_id: parseInt(selectedTemplateId),
        applicant_name: applicantInfo.name,
        applicant_phone: applicantInfo.phone,
        keterangan_kepemilikan: applicantInfo.keterangan_kepemilikan,
        fields: Object.keys(formData).map(key => ({
          field_name: key,
          field_value: formData[key]
        }))
      };

      const res = await request.post(API_ENDPOINTS.SUBMISSIONS.CREATE, payload);
      if (res.success) {
        toast.success('Pengajuan berhasil dibuat oleh Admin!');
        setFormData({});
        setApplicantInfo({ name: '', phone: '', keterangan_kepemilikan: '' });
        setSelectedTemplateId('');
        setSelectedTemplate(null);
      }
    } catch (error) {
      toast.error('Gagal membuat pengajuan.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderDynamicField = (field) => {
    switch(field.field_type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <div key={field.field_name} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">{field.field_label}</label>
            <input 
              type={field.field_type} 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData[field.field_name] || ''}
              onChange={(e) => setFormData({...formData, [field.field_name]: e.target.value})}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={field.field_name} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">{field.field_label}</label>
            <textarea 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData[field.field_name] || ''}
              onChange={(e) => setFormData({...formData, [field.field_name]: e.target.value})}
              rows="3"
            ></textarea>
          </div>
        );
      case 'select':
        const opts = field.options ? JSON.parse(field.options) : [];
        return (
          <div key={field.field_name} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">{field.field_label}</label>
            <select 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData[field.field_name] || ''}
              onChange={(e) => setFormData({...formData, [field.field_name]: e.target.value})}
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
            <label className="block text-sm font-medium text-slate-700 mb-2">{field.field_label}</label>
            <div className="flex gap-4">
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
          <div key={field.field_name} className="mb-6 col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">{field.field_label}</label>
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
                              className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                              value={row[col.name] || ''}
                              onChange={(e) => handleRowChange(index, col.name, e.target.value)}
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

  const groupedFields = selectedTemplate?.fields?.reduce((acc, field) => {
    if (!acc[field.step_title]) acc[field.step_title] = [];
    acc[field.step_title].push(field);
    return acc;
  }, {}) || {};

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Buat Pengajuan Baru</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-800 mb-2">Pilih Jenis Layanan</label>
          <select 
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-primary-500 focus:border-primary-500 font-medium text-slate-700"
            value={selectedTemplateId}
            onChange={handleTemplateChange}
          >
            <option value="">-- Pilih Jenis Layanan --</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {loading && <div className="text-center py-8 text-slate-500">Memuat form...</div>}

        {selectedTemplate && !loading && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Info Pemohon */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileBadge className="w-5 h-5 text-primary-600" />
                Data Pemohon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Pemohon</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    value={applicantInfo.name}
                    onChange={(e) => setApplicantInfo({...applicantInfo, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    value={applicantInfo.phone}
                    onChange={(e) => setApplicantInfo({...applicantInfo, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan Kepemilikan Dokumen (Akte/KK)</label>
                <select 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={applicantInfo.keterangan_kepemilikan}
                  onChange={(e) => setApplicantInfo({...applicantInfo, keterangan_kepemilikan: e.target.value})}
                >
                  <option value="">-- Pilih --</option>
                  <option value="Punya">Punya</option>
                  <option value="Tidak">Tidak Punya</option>
                  <option value="Redaksional">Redaksional</option>
                </select>
              </div>
            </div>

            {/* Dynamic Fields */}
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b">Isian Formulir {selectedTemplate.name}</h2>
              <div className="space-y-4">
                {Object.entries(groupedFields).map(([title, fields]) => (
                  <FieldGroup 
                    key={title} 
                    title={title} 
                    fields={fields} 
                    renderDynamicField={renderDynamicField} 
                  />
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-end">
              <button 
                type="submit" 
                disabled={submitting}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-70"
              >
                <Save className="w-5 h-5" />
                {submitting ? 'Menyimpan...' : 'Simpan Pengajuan'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminFormCreate;

import React from 'react';

const SuratPindahPDF = ({ submission, fields }) => {
  // Helper function to get field value safely
  const v = (fieldName) => {
    const field = fields.find(f => f.field_name === fieldName);
    return field ? field.field_value : '';
  };

  // Parsing dynamic table data
  let anggotaPindah = [];
  try {
    const tableField = v('anggota_pindah');
    if (tableField) {
      anggotaPindah = typeof tableField === 'string' ? JSON.parse(tableField) : tableField;
    }
  } catch (e) {
    anggotaPindah = [];
  }
  if (!Array.isArray(anggotaPindah)) anggotaPindah = [];
  
  // Fill empty rows to make it look like a standard form table (minimum 4 rows)
  const rowsToRender = Math.max(4, anggotaPindah.length);
  const tableRows = [];
  for (let i = 0; i < rowsToRender; i++) {
    tableRows.push(anggotaPindah[i] || {});
  }

  // Current Date logic for signature
  const today = new Date();
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const monthName = months[today.getMonth()];
  const year = today.getFullYear();

  return (
    <div className="w-full text-black bg-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      {/* PAGE 1: SURAT PINDAH */}
      <div className="page-break w-[210mm] h-[297mm] overflow-hidden mx-auto px-[15mm] py-[5mm] bg-white relative box-border flex flex-col text-[12px]">
        
        {/* Header */}
        <div className="text-center mb-2 mt-2">
          <h1 className="font-bold text-[15px] leading-tight mb-1">SURAT PERNYATAAN</h1>
          <p className="text-[13px]">(Pindah Antar Kabupaten/Kota/Provinsi)</p>
        </div>

        <div className="mb-2 ml-10">
          <p>Yang bertanda tangan dibawah ini :</p>
        </div>

        {/* Form Body */}
        <div className="ml-10">
          <table className="w-full mb-1 text-[12px] leading-snug">
            <tbody>
              <tr>
                <td className="w-6 align-top pb-1">1.</td>
                <td className="w-56 align-top pb-1">Nama Lengkap Pemohon</td>
                <td className="w-4 align-top pb-1">:</td>
                <td className="align-top pb-1 font-semibold">{submission.applicant_name}</td>
              </tr>
              <tr>
                <td className="align-top pb-1">2.</td>
                <td className="align-top pb-1">NIK</td>
                <td className="align-top pb-1">:</td>
                <td className="align-top pb-1">{v('pemohon_nik')}</td>
              </tr>
              <tr>
                <td className="align-top pb-1">3.</td>
                <td className="align-top pb-1">Nomor Kartu Keluarga</td>
                <td className="align-top pb-1">:</td>
                <td className="align-top pb-1">{v('pemohon_no_kk')}</td>
              </tr>
              <tr>
                <td className="align-top pb-4">4.</td>
                <td className="align-top pb-4">Nama Kepala Keluarga</td>
                <td className="align-top pb-4">:</td>
                <td className="align-top pb-4">{v('pemohon_kepala_keluarga')}</td>
              </tr>

              <tr>
                <td className="align-top">5.</td>
                <td className="align-top">Alamat Sekarang</td>
                <td className="align-top">:</td>
                <td className="align-top"></td>
              </tr>
              <tr>
                <td className="align-top pb-2"></td>
                <td className="align-top pb-2">( Daerah Tujuan )</td>
                <td className="align-top pb-2"></td>
                <td className="align-top pb-2">
                  <table className="w-full">
                    <tbody>
                      <tr><td className="w-36 pb-1">RT/RW</td><td className="w-4">:</td><td>{v('tujuan_rt_rw')}</td></tr>
                      <tr><td className="pb-1">Desa/Kel</td><td>:</td><td>{v('tujuan_desa')}</td></tr>
                      <tr><td className="pb-1">Kecamatan</td><td>:</td><td>{v('tujuan_kecamatan')}</td></tr>
                      <tr><td className="pb-1">Kabupaten/Kota</td><td>:</td><td>{v('tujuan_kabupaten')}</td></tr>
                      <tr><td className="pb-1">Provinsi</td><td>:</td><td>{v('tujuan_provinsi')}</td></tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td className="align-top">6.</td>
                <td className="align-top">Alamat Daerah Asal</td>
                <td className="align-top">:</td>
                <td className="align-top"></td>
              </tr>
              <tr>
                <td className="align-top pb-2"></td>
                <td className="align-top pb-2"></td>
                <td className="align-top pb-2"></td>
                <td className="align-top pb-2">
                  <table className="w-full">
                    <tbody>
                      <tr><td className="w-36 pb-1">RT/RW</td><td className="w-4">:</td><td>{v('asal_rt_rw')}</td></tr>
                      <tr><td className="pb-1">Desa/Kel</td><td>:</td><td>{v('asal_desa')}</td></tr>
                      <tr><td className="pb-1">Kecamatan</td><td>:</td><td>{v('asal_kecamatan')}</td></tr>
                      <tr><td className="pb-1">Kabupaten/Kota</td><td>:</td><td>Indramayu</td></tr>
                      <tr><td className="pb-1">Provinsi</td><td>:</td><td>Jawa Barat</td></tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td className="align-top pb-1">7.</td>
                <td className="align-top pb-1">Alasan Pindah</td>
                <td className="align-top pb-1">:</td>
                <td className="align-top pb-1">{v('alasan_pindah')}</td>
              </tr>
              <tr>
                <td className="align-top pb-4">8.</td>
                <td className="align-top pb-4">Jumlah Anggota Pindah</td>
                <td className="align-top pb-4">:</td>
                <td className="align-top pb-4">{v('jumlah_anggota')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dynamic Table Anggota Pindah */}
        <div className="mb-2 ml-6 mr-6">
          <table className="w-full border-collapse border border-black text-center text-[12px]">
            <thead>
              <tr>
                <th className="border border-black py-1.5 px-2 font-normal w-12">No.</th>
                <th className="border border-black py-1.5 px-2 font-normal w-64">Nama</th>
                <th className="border border-black py-1.5 px-2 font-normal">NIK</th>
                <th className="border border-black py-1.5 px-2 font-normal w-32">Tangal Lahir</th>
                <th className="border border-black py-1.5 px-2 font-normal w-24">SHDK</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, idx) => (
                <tr key={idx} className="h-8">
                  <td className="border border-black px-2">{idx + 1}.</td>
                  <td className="border border-black px-2 text-left">{row.nama || ''}</td>
                  <td className="border border-black px-2 text-left">{row.nik || ''}</td>
                  <td className="border border-black px-2">{row.tgl_lahir || ''}</td>
                  <td className="border border-black px-2">{row.shdk || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnotes / Statements */}
        <div className="ml-8 mr-6 mb-2 text-justify leading-snug text-[12px]">
          <p className="mb-2">Dengan ini menyatakan dengan sebenarnya bahwa saya :</p>
          <ol className="list-decimal pl-5 mb-4">
            <li className="mb-1">Tidak dalam tindak pidana apapun dan tidak meninggalkan hutang piutang di daerah asli;</li>
            <li className="mb-1">Tidak dalam masalah/perselisihan dengan keluarga (ayah, ibu, suami/istri, saudara dan anggota keluarga lainnya;</li>
            <li className="mb-1">Bertanggung jawab sepenuhnya atas segala resiko dari permohonan kepindahan saya ini tanpa melibatkan pihak manapun.</li>
          </ol>
          <p>Demikian surat pernyataan ini saya buat dengan sebenarnya dalam keadaan sadar dan tanpa paksaan dari pihak manapun dan dapat dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* Signature Area */}
        <div className="flex justify-end mr-12 mt-12 text-[12px]">
          <div className="text-center w-64">
            <p className="mb-1">Indramayu, &nbsp;&nbsp;&nbsp;{monthName} {year}</p>
            <p className="mb-12">Yang Membuat Pernyataan,</p>
            <p className="flex justify-between w-full">
              <span>(</span>
              <span className="font-bold">{submission.applicant_name}</span>
              <span>)</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuratPindahPDF;

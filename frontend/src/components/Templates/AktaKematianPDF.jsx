import React from 'react';

const CharGrid = ({ text = '', length = 10, className = '' }) => {
  const chars = String(text || '').toUpperCase().split('');
  const boxes = Array.from({ length }).map((_, i) => chars[i] || '');

  return (
    <table className={`border-collapse ${className}`} style={{ borderSpacing: 0, margin: 0, padding: 0 }}>
      <tbody>
        <tr style={{ margin: 0, padding: 0 }}>
          {boxes.map((char, index) => (
            <td 
              key={index} 
              className="border border-black text-center align-middle font-bold p-0"
              style={{ width: '12px', height: '14px', minWidth: '12px', maxWidth: '12px', fontSize: '8px', lineHeight: '14px' }}
            >
              {char}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

// Checkbox helper
const CheckboxBox = ({ checked, label, num }) => (
  <div className="flex items-center gap-1 mr-3">
    <div className="border border-black flex items-center justify-center text-[9px] font-bold" style={{ width: '12px', height: '14px', lineHeight: '14px' }}>
      {checked ? 'V' : ''}
    </div>
    <span className="text-[10px]">{num}. {label}</span>
  </div>
);

// Helper to get field value safely
const getFieldValue = (fields, name) => {
  const field = fields.find(f => f.field_name === name);
  return field ? field.field_value : '';
};

const AktaKematianPDF = ({ submission, fields }) => {
  const v = (name) => getFieldValue(fields, name);

  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="w-full text-black text-xs bg-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      
      {/* PAGE 1: F-2.01 (KEMATIAN) */}
      <div className="page-break w-[210mm] h-[297mm] overflow-hidden mx-auto p-[5mm] bg-white relative box-border flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-1">
          <div className="flex gap-12 text-[9px] font-bold mt-1">
            <div>Nomor WA : <span className="border-b border-dotted border-black inline-block w-40 text-center">{submission?.applicant_phone || v('nomor_wa')}</span></div>
            <div>E-mail : <span className="border-b border-dotted border-black inline-block w-48 text-center">{v('email')}</span></div>
          </div>
          <div className="border border-black px-6 py-1 font-bold text-sm">F-2.01</div>
        </div>

        {/* Main Form Border */}
        <div className="border border-black flex-1 flex flex-col relative">
          
          {/* Lokasi */}
          <div className="p-1 text-[10px]">
            <div className="flex mb-[2px]"><div className="w-[140px]">Provinsi</div><div className="w-4">:</div><CharGrid text={v('provinsi')} length={22} /></div>
            <div className="flex mb-[2px]"><div className="w-[140px]">Kabupaten/Kota</div><div className="w-4">:</div><CharGrid text={v('kabupaten')} length={22} /></div>
            <div className="flex mb-[2px]"><div className="w-[140px]">Kecamatan</div><div className="w-4">:</div><CharGrid text={v('kecamatan')} length={22} /></div>
            <div className="flex mb-[2px]"><div className="w-[140px]">Desa/Kelurahan</div><div className="w-4">:</div><CharGrid text={v('desa')} length={22} /></div>
            <div className="flex"><div className="w-[140px]">Kode Wilayah</div><div className="w-4">:</div><CharGrid text={v('kode_wilayah')} length={8} /></div>
          </div>

          <div className="text-center font-bold my-1 mb-2 leading-tight">
            <div className="text-[11px]">FORMULIR PELAPORAN PENCATATAN SIPIL DI DALAM WILAYAH NKRI</div>
            <div className="text-[10px]">JENIS PELAPORAN PENCATATAN SIPIL : KEMATIAN</div>
          </div>

          {/* DATA PELAPOR */}
          <div className="border-t border-black text-[10px]">
            <div className="font-bold px-2 py-[2px]">DATA PELAPOR</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px] font-bold">Nama</div><div className="w-4">:</div><CharGrid text={v('pelapor_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK</div><div className="w-4">:</div><CharGrid text={v('pelapor_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Nomor Dokumen Perjalanan</div><div className="w-4">:</div><CharGrid text={v('pelapor_no_dokumen')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Nomor Kartu Keluarga</div><div className="w-4">:</div><CharGrid text={v('pelapor_no_kk')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('pelapor_kewarganegaraan')} length={20} /></div>
            </div>
          </div>

          {/* DATA SAKSI I */}
          <div className="border-t border-black text-[10px]">
            <div className="font-bold px-2 py-[2px]">DATA SAKSI I</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px] font-bold">Nama</div><div className="w-4">:</div><CharGrid text={v('saksi1_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK</div><div className="w-4">:</div><CharGrid text={v('saksi1_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Nomor Kartu Keluarga</div><div className="w-4">:</div><CharGrid text={v('saksi1_no_kk')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('saksi1_kewarganegaraan')} length={20} /></div>
            </div>
          </div>

          {/* DATA SAKSI II */}
          <div className="border-t border-black text-[10px]">
            <div className="font-bold px-2 py-[2px]">DATA SAKSI II</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px] font-bold">Nama</div><div className="w-4">:</div><CharGrid text={v('saksi2_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK</div><div className="w-4">:</div><CharGrid text={v('saksi2_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Nomor Kartu Keluarga</div><div className="w-4">:</div><CharGrid text={v('saksi2_no_kk')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('saksi2_kewarganegaraan')} length={20} /></div>
            </div>
          </div>

          {/* DATA ORANGTUA */}
          <div className="border-t border-black text-[10px]">
            <div className="font-bold px-2 py-[2px] italic text-[9px]">DATA ORANGTUA ** (hanya diisi untuk keperluan pencatatan kelahiran, lahir mati dan kematian)</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px] font-bold">Nama Ayah</div><div className="w-4">:</div><CharGrid text={v('ayah_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK Ayah</div><div className="w-4">:</div><CharGrid text={v('ayah_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Tempat Lahir Ayah</div><div className="w-4">:</div><CharGrid text={v('ayah_tempat_lahir')} length={20} /></div>
              <div className="flex items-center"><div className="w-[180px]">Tanggal Lahir Ayah</div><div className="w-4">:</div>
                <div className="flex gap-2 items-center">
                  Tgl <CharGrid text={v('ayah_tgl_lahir')?.split('-')[2]} length={2} /> 
                  Bln <CharGrid text={v('ayah_tgl_lahir')?.split('-')[1]} length={2} /> 
                  Thn <CharGrid text={v('ayah_tgl_lahir')?.split('-')[0]} length={4} />
                </div>
              </div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('ayah_kewarganegaraan')} length={20} /></div>
              
              <div className="flex"><div className="w-[180px] font-bold">Nama Ibu</div><div className="w-4">:</div><CharGrid text={v('ibu_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK Ibu</div><div className="w-4">:</div><CharGrid text={v('ibu_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Tempat Lahir Ibu</div><div className="w-4">:</div><CharGrid text={v('ibu_tempat_lahir')} length={20} /></div>
              <div className="flex items-center"><div className="w-[180px]">Tanggal Lahir Ibu</div><div className="w-4">:</div>
                <div className="flex gap-2 items-center">
                  Tgl <CharGrid text={v('ibu_tgl_lahir')?.split('-')[2]} length={2} /> 
                  Bln <CharGrid text={v('ibu_tgl_lahir')?.split('-')[1]} length={2} /> 
                  Thn <CharGrid text={v('ibu_tgl_lahir')?.split('-')[0]} length={4} />
                </div>
              </div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('ibu_kewarganegaraan')} length={20} /></div>
            </div>
          </div>

          {/* KEMATIAN */}
          <div className="border-t border-b border-black text-[10px]">
            <div className="font-bold px-2 py-[2px]">KEMATIAN</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px]">NIK</div><div className="w-4">:</div><CharGrid text={v('meninggal_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px] font-bold">Nama Lengkap</div><div className="w-4">:</div><CharGrid text={v('meninggal_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">Anak Ke</div><div className="w-4">:</div><CharGrid text={v('anak_ke')} length={2} /></div>
              
              <div className="flex items-center"><div className="w-[180px]">Tanggal Kematian</div><div className="w-4">:</div>
                <div className="flex gap-2 items-center">
                  Tgl <CharGrid text={v('tanggal_kematian')?.split('-')[2]} length={2} /> 
                  Bln <CharGrid text={v('tanggal_kematian')?.split('-')[1]} length={2} /> 
                  Thn <CharGrid text={v('tanggal_kematian')?.split('-')[0]} length={4} />
                </div>
              </div>

              <div className="flex"><div className="w-[180px]">Pukul</div><div className="w-4">:</div><CharGrid text={v('pukul_kematian')?.replace(':','')} length={4} /></div>

              <div className="flex items-center mt-1"><div className="w-[180px]">Sebab Kematian</div><div className="w-4">:</div>
                <div className="flex flex-wrap w-[400px]">
                  <CheckboxBox checked={v('sebab_kematian').includes('1')} label="Sakit biasa/tua" num="1" />
                  <CheckboxBox checked={v('sebab_kematian').includes('2')} label="Wabah penyakit" num="2" />
                  <CheckboxBox checked={v('sebab_kematian').includes('3')} label="Kecelakaan" num="3" />
                  <CheckboxBox checked={v('sebab_kematian').includes('4')} label="Kriminalitas" num="4" />
                  <CheckboxBox checked={v('sebab_kematian').includes('5')} label="Bunuh diri" num="5" />
                  <CheckboxBox checked={v('sebab_kematian').includes('6')} label="Lainnya" num="6" />
                </div>
              </div>

              <div className="flex mt-1"><div className="w-[180px]">Tempat Kematian</div><div className="w-4">:</div><CharGrid text={v('tempat_kematian')} length={20} /></div>

              <div className="flex items-center mt-1"><div className="w-[180px]">Yang Menerangkan</div><div className="w-4">:</div>
                <div className="flex flex-wrap">
                  <CheckboxBox checked={v('yang_menerangkan').includes('1')} label="Dokter" num="1" />
                  <CheckboxBox checked={v('yang_menerangkan').includes('2')} label="Tenaga Kesehatan" num="2" />
                  <CheckboxBox checked={v('yang_menerangkan').includes('3')} label="Kepolisian" num="3" />
                  <CheckboxBox checked={v('yang_menerangkan').includes('4')} label="Lainnya" num="4" />
                </div>
              </div>

            </div>
          </div>

          {/* Footer Signatures inside Border */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex justify-between px-10 text-[10px] pt-2 pb-2 relative">
              <div className="text-center w-56">
                <p className="mb-6 leading-tight">Mengetahui :<br/>Kepala Desa / Lurah /<br/>Pejabat Dukcapil Yang Membidangi</p>
                <p className="w-48 mx-auto"></p>
              </div>
              <div className="text-center w-56">
                <p className="mb-1 text-right">....................................., ................. 20....</p>
                <p className="mb-6">Pelapor</p>
                <p className="font-bold uppercase inline-block border-b border-black w-full text-center">({v('pelapor_nama') || '.....................................'})</p>
              </div>
              
            </div>
          </div>

        </div>

        {/* Syarat Box (Outside border) */}
        <div className="mt-2 text-[9px] border-2 border-black p-2 w-full">
          <div className="font-bold mb-1">Kelengkapan Persyaratan :</div>
          <div className="space-y-[2px]">
            <p>1. Surat Keterangan Kematian dari Dokter/Tenaga Kesehatan/Lainnya atau;</p>
            <p className="pl-3">Surat Keterangan Kematian dari Kepolisian (bagi kematian seseorang yang tidak jelas identitasnya) atau;</p>
            <p className="pl-3">Salinan Penetapan Pengadilan (bagi kematian seseorang yang tidak jelas keberadaannya karena hilang atau mati tetapi tidak ditemukan jenazahnya)</p>
            <p>2. Kartu Keluarga (KK) dan KTP Jenazah</p>
            <p>3. Foto copy KTP-el (Pemohon)</p>
            <p>4. Foto copy KTP-el (kedua orang saksi)</p>
          </div>
        </div>
      </div>


      {/* PAGE 2: SPTJM KEMATIAN */}
      <div className="page-break w-[210mm] h-[297mm] overflow-hidden mx-auto p-[20mm] bg-white text-[12px] leading-relaxed">
        <h3 className="text-center font-bold text-[13px] mb-8 leading-snug uppercase">
          SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK (STJPM)<br/>KEBENARAN DATA KEMATIAN
        </h3>

        <p className="mb-4">Saya yang bertandatangan dibawah ini :</p>
        
        <table className="w-full mb-6 text-[14px]">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td>{v('pelapor_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td>{v('pelapor_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat / tanggal lahir</td><td className="w-4">:</td><td>{v('pelapor_tempat_lahir')}, {v('pelapor_tgl_lahir')}</td></tr>
            <tr><td className="w-48 pl-8">Pekerjaan</td><td className="w-4">:</td><td>{v('pelapor_pekerjaan')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td>{v('pelapor_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="mb-4">Dengan ini Menyatakan dan melaporkan dengan sebenarnya, bahwa :</p>

        <table className="w-full mb-6 text-[14px]">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td>{v('meninggal_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td>{v('meninggal_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat / tanggal lahir</td><td className="w-4">:</td><td>{v('meninggal_tempat_lahir')}, {v('meninggal_tgl_lahir')}</td></tr>
          </tbody>
        </table>

        <p className="mb-4">Telah meninggal dunia pada :</p>

        <table className="w-full mb-8 text-[14px]">
          <tbody>
            <tr><td className="w-48 pl-8">Hari / Tanggal</td><td className="w-4">:</td><td>{v('tanggal_kematian')}</td></tr>
            <tr><td className="w-48 pl-8">Jam</td><td className="w-4">:</td><td>{v('pukul_kematian')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat Meninggal</td><td className="w-4">:</td><td>{v('tempat_kematian')}</td></tr>
          </tbody>
        </table>

        <p className="text-justify mb-12 indent-8 leading-relaxed">
          Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dan apabila dikemudian hari
          ternyata pernyataan saya ini tidak benar, maka saya bersedia diproses secara hukum Sesuai dengan
          peraturan perundang-undangan dan dokumen yang diterbitkan akibat dari pernyataan ini menjadi tidak sah.
        </p>

        <div className="flex justify-end mb-4">
          <div className="w-64">
            <p>Indramayu, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {year}**)</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-64">
            <p className="mb-12 ml-4">Saksi I</p>
            <p className="border-b border-black w-56"></p>
            <p>NIK : {v('saksi1_nik')}</p>

            <p className="mb-12 mt-6 ml-4">Saksi II</p>
            <p className="border-b border-black w-56"></p>
            <p>NIK : {v('saksi2_nik')}</p>
          </div>
          <div className="w-64 text-center">
            <p className="mb-24">Saya yang menyatakan</p>
            <p className="border-b border-black font-bold uppercase inline-block min-w-[200px]">{v('pelapor_nama')}</p>
          </div>
        </div>

        <div className="mt-8 text-[12px] leading-tight">
          <p>Keterangan :</p>
          <p>Lampiran ini digunakan dalam hal perkawinan tidak dapat dibuktikan dengan Akta perkawinan atau akta nikah.</p>
          <p>*) Coret yang tidak perlu</p>
          <p>**) Ditulis nama Ibu Kota Kabupaten / Kota, Tanggal-Bulan-Tahun</p>
        </div>

      </div>

    </div>
  );
};

export default AktaKematianPDF;

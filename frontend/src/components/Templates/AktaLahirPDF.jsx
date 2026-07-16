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
    <span className="text-[9px]">{num}. {label}</span>
  </div>
);

// Helper to get field value safely
const getFieldValue = (fields, name) => {
  const field = fields.find(f => f.field_name === name);
  return field ? field.field_value : '';
};

const AktaLahirPDF = ({ submission, fields }) => {
  const v = (name) => getFieldValue(fields, name);

  return (
    <div className="w-full text-black text-xs bg-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      
      {/* PAGE 1: F-2.01 */}
      <div className="page-break w-[210mm] h-[297mm] overflow-hidden mx-auto p-[5mm] bg-white relative box-border flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-1">
          <div className="flex gap-12 text-[9px] font-bold mt-1">
            <div>Nomor WA : <span className="border-b border-dotted border-black inline-block w-40 text-center">{v('nomor_wa')}</span></div>
            <div>E-mail : <span className="border-b border-dotted border-black inline-block w-48 text-center">{v('email')}</span></div>
          </div>
          <div className="border border-black px-6 py-1 font-bold text-sm">F-2.01</div>
        </div>

        {/* Main Form Border */}
        <div className="border border-black flex-1 flex flex-col relative">
          
          {/* Lokasi */}
          <div className="p-1 text-[9px]">
            <div className="flex mb-[1px]"><div className="w-[140px]">Provinsi</div><div className="w-4">:</div><CharGrid text={v('provinsi')} length={22} /></div>
            <div className="flex mb-[1px]"><div className="w-[140px]">Kabupaten/Kota</div><div className="w-4">:</div><CharGrid text={v('kabupaten')} length={22} /></div>
            <div className="flex mb-[1px]"><div className="w-[140px]">Kecamatan</div><div className="w-4">:</div><CharGrid text={v('kecamatan')} length={22} /></div>
            <div className="flex mb-[1px]"><div className="w-[140px]">Desa/Kelurahan</div><div className="w-4">:</div><CharGrid text={v('desa')} length={22} /></div>
            <div className="flex"><div className="w-[140px]">Kode Wilayah</div><div className="w-4">:</div><CharGrid text={v('kode_wilayah')} length={8} /></div>
          </div>

          <div className="text-center font-bold my-1 mb-2 leading-tight">
            <div className="text-[10px]">FORMULIR PELAPORAN PENCATATAN SIPIL DI DALAM WILAYAH NKRI</div>
            <div className="text-[9px]">JENIS PELAPORAN PENCATATAN SIPIL : KELAHIRAN</div>
          </div>

          {/* DATA PELAPOR */}
          <div className="border-t border-black text-[9px]">
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
          <div className="border-t border-black text-[9px]">
            <div className="font-bold px-2 py-[2px]">DATA SAKSI I</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px] font-bold">Nama</div><div className="w-4">:</div><CharGrid text={v('saksi1_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK</div><div className="w-4">:</div><CharGrid text={v('saksi1_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Nomor Kartu Keluarga</div><div className="w-4">:</div><CharGrid text={v('saksi1_no_kk')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('saksi1_kewarganegaraan')} length={20} /></div>
            </div>
          </div>

          {/* DATA SAKSI II */}
          <div className="border-t border-black text-[9px]">
            <div className="font-bold px-2 py-[2px]">DATA SAKSI II</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px] font-bold">Nama</div><div className="w-4">:</div><CharGrid text={v('saksi2_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK</div><div className="w-4">:</div><CharGrid text={v('saksi2_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Nomor Kartu Keluarga</div><div className="w-4">:</div><CharGrid text={v('saksi2_no_kk')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('saksi2_kewarganegaraan')} length={20} /></div>
            </div>
          </div>

          {/* DATA ORANGTUA */}
          <div className="border-t border-black text-[9px]">
            <div className="font-bold px-2 py-[2px] italic text-[8px]">DATA ORANGTUA ** (hanya diisi untuk keperluan pencatatan kelahiran, lahir mati dan kematian)</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px] font-bold">Nama Ayah</div><div className="w-4">:</div><CharGrid text={v('ayah_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK Ayah</div><div className="w-4">:</div><CharGrid text={v('ayah_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Tempat Lahir Ayah</div><div className="w-4">:</div><CharGrid text={v('ayah_tempat_lahir')} length={20} /></div>
              <div className="flex items-center"><div className="w-[180px]">Tanggal Lahir Ayah</div><div className="w-4">:</div>
                <div className="flex gap-2 items-center">
                  Tgl : <CharGrid text={v('ayah_tgl_lahir')?.split('-')[2]} length={2} /> 
                  Bln : <CharGrid text={v('ayah_tgl_lahir')?.split('-')[1]} length={2} /> 
                  Thn : <CharGrid text={v('ayah_tgl_lahir')?.split('-')[0]} length={4} />
                </div>
              </div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('ayah_kewarganegaraan')} length={20} /></div>
              
              <div className="flex"><div className="w-[180px] font-bold">Nama Ibu</div><div className="w-4">:</div><CharGrid text={v('ibu_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK Ibu</div><div className="w-4">:</div><CharGrid text={v('ibu_nik')} length={16} /></div>
              <div className="flex"><div className="w-[180px]">Tempat Lahir Ibu</div><div className="w-4">:</div><CharGrid text={v('ibu_tempat_lahir')} length={20} /></div>
              <div className="flex items-center"><div className="w-[180px]">Tanggal Lahir Ibu</div><div className="w-4">:</div>
                <div className="flex gap-2 items-center">
                  Tgl : <CharGrid text={v('ibu_tgl_lahir')?.split('-')[2]} length={2} /> 
                  Bln : <CharGrid text={v('ibu_tgl_lahir')?.split('-')[1]} length={2} /> 
                  Thn : <CharGrid text={v('ibu_tgl_lahir')?.split('-')[0]} length={4} />
                </div>
              </div>
              <div className="flex"><div className="w-[180px]">Kewarganegaraan</div><div className="w-4">:</div><CharGrid text={v('ibu_kewarganegaraan')} length={20} /></div>
            </div>
          </div>

          {/* DATA ANAK */}
          <div className="border-t border-b border-black text-[9px]">
            <div className="font-bold px-2 py-[2px]">DATA ANAK</div>
            <div className="px-2 pb-1 space-y-[1px]">
              <div className="flex"><div className="w-[180px] font-bold">Nama</div><div className="w-4">:</div><CharGrid text={v('anak_nama')} length={30} /></div>
              <div className="flex"><div className="w-[180px]">NIK</div><div className="w-4">:</div><CharGrid text={v('anak_nik')} length={16} /></div>
              
              <div className="flex items-center"><div className="w-[180px]">Jenis Kelamin</div><div className="w-4">:</div>
                <div className="flex">
                  <CheckboxBox checked={v('anak_jenis_kelamin').includes('1')} label="Laki-Laki" num="1" />
                  <CheckboxBox checked={v('anak_jenis_kelamin').includes('2')} label="Perempuan" num="2" />
                </div>
              </div>
              
              <div className="flex items-center"><div className="w-[180px]">Tempat dilahirkan</div><div className="w-4">:</div>
                <div className="flex">
                  <CheckboxBox checked={v('anak_tempat_dilahirkan').includes('1')} label="RS/RB" num="1" />
                  <CheckboxBox checked={v('anak_tempat_dilahirkan').includes('2')} label="Puskesmas" num="2" />
                  <CheckboxBox checked={v('anak_tempat_dilahirkan').includes('3')} label="Polindes" num="3" />
                  <CheckboxBox checked={v('anak_tempat_dilahirkan').includes('4')} label="Rumah" num="4" />
                  <CheckboxBox checked={v('anak_tempat_dilahirkan').includes('5')} label="Lainnya" num="5" />
                </div>
              </div>

              <div className="flex"><div className="w-[180px]">Tempat kelahiran</div><div className="w-4">:</div><CharGrid text={v('anak_tempat_kelahiran')} length={20} /></div>
              
              <div className="flex items-center"><div className="w-[180px]">Hari dan tanggal lahir</div><div className="w-4">:</div>
                <div className="flex gap-2 items-center">
                  Hari : <span className="border-b border-dotted border-black w-20 inline-block text-center mr-2">{v('anak_hari_lahir')}</span>
                  Tgl <CharGrid text={v('anak_tanggal_lahir')?.split('-')[2]} length={2} /> 
                  Bln <CharGrid text={v('anak_tanggal_lahir')?.split('-')[1]} length={2} /> 
                  Thn <CharGrid text={v('anak_tanggal_lahir')?.split('-')[0]} length={4} />
                </div>
              </div>

              <div className="flex"><div className="w-[180px]">Pukul</div><div className="w-4">:</div><CharGrid text={v('anak_waktu_lahir')?.replace(':','')} length={4} /></div>

              <div className="flex items-center mt-1"><div className="w-[180px]">Jenis Kelahiran</div><div className="w-4">:</div>
                <div className="flex flex-wrap">
                  <CheckboxBox checked={v('anak_jenis_kelahiran').includes('1')} label="Tunggal" num="1" />
                  <CheckboxBox checked={v('anak_jenis_kelahiran').includes('2')} label="Kembar 2" num="2" />
                  <CheckboxBox checked={v('anak_jenis_kelahiran').includes('3')} label="Kembar 3" num="3" />
                  <CheckboxBox checked={v('anak_jenis_kelahiran').includes('4')} label="Kembar 4" num="4" />
                  <CheckboxBox checked={v('anak_jenis_kelahiran').includes('5')} label="Lainnya" num="5" />
                </div>
              </div>

              <div className="flex"><div className="w-[180px]">Kelahiran ke</div><div className="w-4">:</div><CharGrid text={v('anak_kelahiran_ke')} length={2} /></div>

              <div className="flex items-center mt-1"><div className="w-[180px]">Penolong kelahiran</div><div className="w-4">:</div>
                <div className="flex flex-wrap">
                  <CheckboxBox checked={v('anak_penolong_kelahiran').includes('1')} label="Dokter" num="1" />
                  <CheckboxBox checked={v('anak_penolong_kelahiran').includes('2')} label="Bidan/Perawat" num="2" />
                  <CheckboxBox checked={v('anak_penolong_kelahiran').includes('3')} label="Dukun" num="3" />
                  <CheckboxBox checked={v('anak_penolong_kelahiran').includes('4')} label="Lainnya" num="4" />
                </div>
              </div>

              <div className="flex items-center"><div className="w-[180px]">Berat bayi</div><div className="w-4">:</div><CharGrid text={v('anak_berat')} length={4} /><span className="ml-2">Kg</span></div>
              <div className="flex items-center"><div className="w-[180px]">Panjang bayi</div><div className="w-4">:</div><CharGrid text={v('anak_panjang')} length={4} /><span className="ml-2">Cm</span></div>
            </div>
          </div>

          {/* Footer Signatures inside Border */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex justify-between px-10 text-[9px] pt-2 pb-6 relative">
              <div className="text-center w-56">
                <p className="mb-10 leading-tight">Mengetahui :<br/>Kepala Desa / Lurah /<br/>Pejabat Dukcapil Yang Membidangi</p>
                <p className="border-b border-black w-48 mx-auto"></p>
              </div>
              <div className="text-center w-56">
                <p className="mb-1 text-right">....................................., ................. 20....</p>
                <p className="mb-8">Pelapor</p>
                <p className="font-bold uppercase inline-block border-b border-black w-full text-center">({v('pelapor_nama') || '.....................................'})</p>
              </div>
              
            </div>
          </div>

        </div>

        {/* Syarat Box (Outside border) */}
        <div className="mt-2 text-[8px] border-2 border-black p-2 w-full">
          <div className="font-bold underline mb-1">Kelengkapan Persyaratan :</div>
          <div className="space-y-0.5">
            <p>1. Surat Keterangan Kelahiran</p>
            <p>2. Buku Nikah/Kutipan Akta Perkawinan atau bukti lain yang sah</p>
            <p>3. Kartu Keluarga (KK)</p>
            <p>4. KTP-el (kedua orangtua/Pelapor)</p>
            <p>5. KTP-el (kedua orang saksi)</p>
          </div>
        </div>
      </div>


      {/* PAGE 2: SPTJM KELAHIRAN */}
      <div className="page-break w-[210mm] h-[297mm] overflow-hidden mx-auto p-[20mm] bg-white text-[12px] leading-relaxed">
        <h3 className="text-center font-bold text-[13px] mb-6 leading-snug">
          SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK (SPTJM) KEBENARAN<br/>DATA KELAHIRAN
        </h3>

        <p className="mb-4">Saya yang bertandatangan dibawah ini :</p>
        
        <table className="w-full mb-4">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat/tanggal lahir</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_tempat_lahir')}, {v('pelapor_tgl_lahir')}</td></tr>
            <tr><td className="w-48 pl-8">Pekerjaan</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_pekerjaan')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="mb-4">menyatakan bahwa:</p>

        <table className="w-full mb-4">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('anak_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('anak_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat/tanggal lahir</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('anak_tempat_kelahiran')}, {v('anak_tanggal_lahir')}</td></tr>
            <tr><td className="w-48 pl-8">Anak ke</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('anak_kelahiran_ke')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="mb-4">adalah anak kandung dari :</p>

        <table className="w-full mb-4">
          <tbody>
            <tr><td className="w-48 pl-8">Nama Ibu</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat/tanggal lahir</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_tempat_lahir')}, {v('ibu_tgl_lahir')}</td></tr>
            <tr><td className="w-48 pl-8">Pekerjaan</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_pekerjaan')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="mb-4">yang lahir dengan penolong kelahiran :</p>

        <table className="w-full mb-8">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('penolong_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('penolong_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Pekerjaan</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('penolong_pekerjaan')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('penolong_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="text-justify mb-16 leading-relaxed">
          Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dan apabila dikemudian hari ternyata pernyataan saya ini tidak benar, maka saya bersedia diproses secara hukum sesuai dengan peraturan perundang-undangan dan dokumen yang diterbitkan akibat dari pernyataan ini menjadi tidak sah.
        </p>

        <div className="flex justify-between">
          <div className="w-64">
            <p className="mb-20">Saksi I,</p>
            <p className="border-b border-dotted border-black w-48 text-center">{v('saksi1_nama')}</p>
            <p>NIK. {v('saksi1_nik')}</p>

            <p className="mb-20 mt-8">Saksi II,</p>
            <p className="border-b border-dotted border-black w-48 text-center">{v('saksi2_nama')}</p>
            <p>NIK. {v('saksi2_nik')}</p>
          </div>
          <div className="w-64 text-center">
            <p>Indramayu, ......................... 20....</p>
            <p className="mb-24">Saya yang menyatakan,</p>
            <p className="border-b border-dotted border-black font-bold uppercase inline-block min-w-[200px]">{v('pelapor_nama')}</p>
          </div>
        </div>

        <div className="mt-12 text-[11px] leading-tight">
          <p>Keterangan :</p>
          <p>Lampiran ini digunakan dalam hal persyaratan berupa Surat Keterangan Lahir tidak terpenuhi.</p>
          <p>*) Ditulis urutan kelahiran anak.</p>
          <p>**)Ditulis nama Ibu kota Kabupaten/Kota, Tanggal-Bulan-Tahun.</p>
        </div>

      </div>


      {/* PAGE 3: SPTJM DATA */}
      <div className="page-break w-[210mm] h-[297mm] overflow-hidden mx-auto p-[20mm] bg-white text-[12px] leading-relaxed">
        <h3 className="text-center font-bold text-[13px] mb-10 leading-snug">
          SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK (SPTJM)<br/>KEBENARAN DATA
        </h3>

        <p className="mb-6">Saya yang bertandatangan dibawah ini :</p>
        
        <table className="w-full mb-6">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat/tanggal lahir</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_tempat_lahir')}, {v('pelapor_tgl_lahir')}</td></tr>
            <tr><td className="w-48 pl-8">Pekerjaan</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_pekerjaan')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('pelapor_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="mb-4">Menerangkan bahwa:</p>

        <table className="w-full mb-6">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('anak_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('anak_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat/tanggal lahir</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('anak_tempat_kelahiran')}, {v('anak_tanggal_lahir')}</td></tr>
          </tbody>
        </table>

        <p className="mb-4">Nama Orang Tua</p>

        <table className="w-full mb-10">
          <tbody>
            <tr><td className="w-48 pl-8">Ayah</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ayah_nama')}</td></tr>
            <tr><td className="w-48 pl-8">Ibu</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_nama')}</td></tr>
            <tr><td className="w-48 pl-8">Pekerjaan</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ayah_pekerjaan')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ayah_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="text-justify mb-4 leading-relaxed">
          Data tersebut adalah benar dan sesuai dengan berkas pengajuan pada permohonan Akta kelahiran/Akta Kematian yang di ajukan.
        </p>
        <p className="text-justify mb-24 leading-relaxed">
          Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dan apabila dikemudian hari ternyata pernyataan saya ini tidak benar, maka saya bersedia diproses secara hukum Sesuai dengan peraturan perundang-undangan yang berlaku dan tidak akan melibatkan pihak manapun.
        </p>

        <div className="flex justify-end">
          <div className="w-64 text-center">
            <p>Indramayu, ......................... 20....</p>
            <p className="mb-24">Saya yang menyatakan,</p>
            <p className="border-b border-dotted border-black font-bold uppercase inline-block min-w-[200px]">{v('pelapor_nama')}</p>
          </div>
        </div>

      </div>


      {/* PAGE 4: SPTJM KEBENARAN SEBAGAI PASANGAN SUAMI ISTRI */}
      <div className="page-break w-[210mm] h-[297mm] overflow-hidden mx-auto p-[20mm] bg-white text-[12px] leading-relaxed">
        <h3 className="text-center font-bold text-[13px] mb-10 leading-snug">
          SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK (SPTJM)<br/>KEBENARAN SEBAGAI PASANGAN SUAMI ISTRI
        </h3>

        <p className="mb-6">Saya yang bertandatangan dibawah ini :</p>
        
        <table className="w-full mb-6">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ayah_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ayah_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat/tanggal lahir</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ayah_tempat_lahir')}, {v('ayah_tgl_lahir')}</td></tr>
            <tr><td className="w-48 pl-8">Pekerjaan</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ayah_pekerjaan')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ayah_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="mb-4">Menyatakan bahwa:</p>

        <table className="w-full mb-10">
          <tbody>
            <tr><td className="w-48 pl-8">Nama</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_nama')}</td></tr>
            <tr><td className="w-48 pl-8">NIK</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_nik')}</td></tr>
            <tr><td className="w-48 pl-8">Tempat/tanggal lahir</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_tempat_lahir')}, {v('ibu_tgl_lahir')}</td></tr>
            <tr><td className="w-48 pl-8">Pekerjaan</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_pekerjaan')}</td></tr>
            <tr><td className="w-48 pl-8">Alamat</td><td className="w-4">:</td><td className="border-b border-dotted border-black">{v('ibu_alamat')}</td></tr>
          </tbody>
        </table>

        <p className="text-justify mb-24 leading-relaxed">
          adalah benar isteri saya dan pernikahan kami tidak dapat dibuktikan dengan akta perkawinan/buku nikah.
          <br/><br/>
          Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dan apabila dikemudian hari ternyata pernyataan saya ini tidak benar, maka saya bersedia diproses secara hukum sesuai dengan peraturan perundang-undangan dan dokumen yang diterbitkan akibat dari pernyataan ini menjadi tidak sah.
        </p>

        <div className="flex justify-between">
          <div className="w-64">
            <p className="mb-20">Saksi I,</p>
            <p className="border-b border-dotted border-black w-48 text-center">{v('saksi1_nama')}</p>
            <p>NIK. {v('saksi1_nik')}</p>

            <p className="mb-20 mt-8">Saksi II,</p>
            <p className="border-b border-dotted border-black w-48 text-center">{v('saksi2_nama')}</p>
            <p>NIK. {v('saksi2_nik')}</p>
          </div>
          <div className="w-64 text-center">
            <p>Indramayu, ......................... 20....</p>
            <p className="mb-24">Saya yang menyatakan,</p>
            <p className="border-b border-dotted border-black font-bold uppercase inline-block min-w-[200px]">{v('ayah_nama')}</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AktaLahirPDF;

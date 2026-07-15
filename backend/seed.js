const pool = require('./config/db');

async function seed() {
  try {
    const [templates] = await pool.query('SELECT * FROM form_templates');
    if (templates.length === 0) {
      console.log('No templates found. Did you run database.sql?');
      return;
    }

    // Clear existing definitions
    await pool.query('DELETE FROM form_definitions');

    const aktaLahirId = templates.find(t => t.slug === 'akta-lahir').id;
    const suratPindahId = templates.find(t => t.slug === 'surat-pindah').id;
    const aktaKematianId = templates.find(t => t.slug === 'akta-kematian').id;

    const fields = [
      // Akta Lahir - Data Lokasi & Kontak
      { template_id: aktaLahirId, step_number: 2, step_title: 'Data Lokasi & Kontak', field_name: 'nomor_wa', field_label: 'Nomor WA', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaLahirId, step_number: 2, step_title: 'Data Lokasi & Kontak', field_name: 'email', field_label: 'E-mail', field_type: 'text', is_required: true, display_order: 2 },
      { template_id: aktaLahirId, step_number: 2, step_title: 'Data Lokasi & Kontak', field_name: 'provinsi', field_label: 'Provinsi', field_type: 'text', is_required: true, display_order: 3 },
      { template_id: aktaLahirId, step_number: 2, step_title: 'Data Lokasi & Kontak', field_name: 'kabupaten', field_label: 'Kabupaten/Kota', field_type: 'text', is_required: true, display_order: 4 },
      { template_id: aktaLahirId, step_number: 2, step_title: 'Data Lokasi & Kontak', field_name: 'kecamatan', field_label: 'Kecamatan', field_type: 'text', is_required: true, display_order: 5 },
      { template_id: aktaLahirId, step_number: 2, step_title: 'Data Lokasi & Kontak', field_name: 'desa', field_label: 'Desa/Kelurahan', field_type: 'text', is_required: true, display_order: 6 },
      { template_id: aktaLahirId, step_number: 2, step_title: 'Data Lokasi & Kontak', field_name: 'kode_wilayah', field_label: 'Kode Wilayah', field_type: 'text', is_required: true, display_order: 7 },

      // Akta Lahir - Data Pelapor
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_nama', field_label: 'Nama Pelapor', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_nik', field_label: 'NIK Pelapor', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_no_dokumen', field_label: 'Nomor Dokumen Perjalanan', field_type: 'text', is_required: false, display_order: 3 },
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_no_kk', field_label: 'Nomor Kartu Keluarga', field_type: 'number', is_required: true, display_order: 4 },
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_kewarganegaraan', field_label: 'Kewarganegaraan', field_type: 'text', is_required: true, display_order: 5 },
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_tempat_lahir', field_label: 'Tempat Lahir Pelapor (SPTJM)', field_type: 'text', is_required: false, display_order: 6 },
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_tgl_lahir', field_label: 'Tanggal Lahir Pelapor (SPTJM)', field_type: 'date', is_required: false, display_order: 7 },
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_pekerjaan', field_label: 'Pekerjaan Pelapor (SPTJM)', field_type: 'text', is_required: false, display_order: 8 },
      { template_id: aktaLahirId, step_number: 3, step_title: 'Data Pelapor', field_name: 'pelapor_alamat', field_label: 'Alamat Pelapor (SPTJM)', field_type: 'textarea', is_required: false, display_order: 9 },

      // Akta Lahir - Data Saksi I
      { template_id: aktaLahirId, step_number: 4, step_title: 'Data Saksi I', field_name: 'saksi1_nama', field_label: 'Nama Saksi I', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaLahirId, step_number: 4, step_title: 'Data Saksi I', field_name: 'saksi1_nik', field_label: 'NIK Saksi I', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaLahirId, step_number: 4, step_title: 'Data Saksi I', field_name: 'saksi1_no_kk', field_label: 'Nomor Kartu Keluarga', field_type: 'number', is_required: true, display_order: 3 },
      { template_id: aktaLahirId, step_number: 4, step_title: 'Data Saksi I', field_name: 'saksi1_kewarganegaraan', field_label: 'Kewarganegaraan', field_type: 'text', is_required: true, display_order: 4 },

      // Akta Lahir - Data Saksi II
      { template_id: aktaLahirId, step_number: 5, step_title: 'Data Saksi II', field_name: 'saksi2_nama', field_label: 'Nama Saksi II', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaLahirId, step_number: 5, step_title: 'Data Saksi II', field_name: 'saksi2_nik', field_label: 'NIK Saksi II', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaLahirId, step_number: 5, step_title: 'Data Saksi II', field_name: 'saksi2_no_kk', field_label: 'Nomor Kartu Keluarga', field_type: 'number', is_required: true, display_order: 3 },
      { template_id: aktaLahirId, step_number: 5, step_title: 'Data Saksi II', field_name: 'saksi2_kewarganegaraan', field_label: 'Kewarganegaraan', field_type: 'text', is_required: true, display_order: 4 },

      // Akta Lahir - Data Orangtua
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ayah_nama', field_label: 'Nama Ayah', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ayah_nik', field_label: 'NIK Ayah', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ayah_tempat_lahir', field_label: 'Tempat Lahir Ayah', field_type: 'text', is_required: true, display_order: 3 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ayah_tgl_lahir', field_label: 'Tanggal Lahir Ayah', field_type: 'date', is_required: true, display_order: 4 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ayah_kewarganegaraan', field_label: 'Kewarganegaraan Ayah', field_type: 'text', is_required: true, display_order: 5 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ayah_pekerjaan', field_label: 'Pekerjaan Ayah (SPTJM)', field_type: 'text', is_required: false, display_order: 6 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ayah_alamat', field_label: 'Alamat Ayah (SPTJM)', field_type: 'textarea', is_required: false, display_order: 7 },
      
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ibu_nama', field_label: 'Nama Ibu', field_type: 'text', is_required: true, display_order: 8 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ibu_nik', field_label: 'NIK Ibu', field_type: 'number', is_required: true, display_order: 9 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ibu_tempat_lahir', field_label: 'Tempat Lahir Ibu', field_type: 'text', is_required: true, display_order: 10 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ibu_tgl_lahir', field_label: 'Tanggal Lahir Ibu', field_type: 'date', is_required: true, display_order: 11 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ibu_kewarganegaraan', field_label: 'Kewarganegaraan Ibu', field_type: 'text', is_required: true, display_order: 12 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ibu_pekerjaan', field_label: 'Pekerjaan Ibu (SPTJM)', field_type: 'text', is_required: false, display_order: 13 },
      { template_id: aktaLahirId, step_number: 6, step_title: 'Data Orang Tua', field_name: 'ibu_alamat', field_label: 'Alamat Ibu (SPTJM)', field_type: 'textarea', is_required: false, display_order: 14 },

      // Akta Lahir - Data Anak
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_nama', field_label: 'Nama Anak', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_nik', field_label: 'NIK Anak', field_type: 'number', is_required: false, display_order: 2 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_jenis_kelamin', field_label: 'Jenis Kelamin', field_type: 'radio', is_required: true, options: JSON.stringify(['1. Laki-Laki', '2. Perempuan']), display_order: 3 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_tempat_dilahirkan', field_label: 'Tempat Dilahirkan', field_type: 'radio', is_required: true, options: JSON.stringify(['1. RS/RB', '2. Puskesmas', '3. Polindes', '4. Rumah', '5. Lainnya']), display_order: 4 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_tempat_kelahiran', field_label: 'Tempat Kelahiran (Kota/Kab)', field_type: 'text', is_required: true, display_order: 5 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_hari_lahir', field_label: 'Hari Lahir', field_type: 'text', is_required: true, display_order: 6 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_tanggal_lahir', field_label: 'Tanggal Lahir', field_type: 'date', is_required: true, display_order: 7 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_waktu_lahir', field_label: 'Pukul Lahir (HH:MM)', field_type: 'text', is_required: true, display_order: 8 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_jenis_kelahiran', field_label: 'Jenis Kelahiran', field_type: 'radio', is_required: true, options: JSON.stringify(['1. Tunggal', '2. Kembar 2', '3. Kembar 3', '4. Kembar 4', '5. Lainnya']), display_order: 9 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_kelahiran_ke', field_label: 'Kelahiran Ke', field_type: 'number', is_required: true, display_order: 10 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_penolong_kelahiran', field_label: 'Penolong Kelahiran', field_type: 'radio', is_required: true, options: JSON.stringify(['1. Dokter', '2. Bidan/Perawat', '3. Dukun', '4. Lainnya']), display_order: 11 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_berat', field_label: 'Berat Bayi (Kg)', field_type: 'number', is_required: true, display_order: 12 },
      { template_id: aktaLahirId, step_number: 7, step_title: 'Data Anak', field_name: 'anak_panjang', field_label: 'Panjang Bayi (Cm)', field_type: 'number', is_required: true, display_order: 13 },

      // Akta Lahir - Data Penolong (Untuk SPTJM)
      { template_id: aktaLahirId, step_number: 8, step_title: 'Data Penolong SPTJM', field_name: 'penolong_nama', field_label: 'Nama Penolong Persalinan (SPTJM)', field_type: 'text', is_required: false, display_order: 1 },
      { template_id: aktaLahirId, step_number: 8, step_title: 'Data Penolong SPTJM', field_name: 'penolong_nik', field_label: 'NIK Penolong (SPTJM)', field_type: 'number', is_required: false, display_order: 2 },
      { template_id: aktaLahirId, step_number: 8, step_title: 'Data Penolong SPTJM', field_name: 'penolong_pekerjaan', field_label: 'Pekerjaan Penolong (SPTJM)', field_type: 'text', is_required: false, display_order: 3 },
      { template_id: aktaLahirId, step_number: 8, step_title: 'Data Penolong SPTJM', field_name: 'penolong_alamat', field_label: 'Alamat Penolong (SPTJM)', field_type: 'textarea', is_required: false, display_order: 4 },


      // Surat Pindah
      { template_id: suratPindahId, step_number: 2, step_title: 'Data Pemohon', field_name: 'pemohon_nik', field_label: 'NIK Pemohon', field_type: 'number', is_required: true, display_order: 1 },
      { template_id: suratPindahId, step_number: 2, step_title: 'Data Pemohon', field_name: 'pemohon_no_kk', field_label: 'Nomor Kartu Keluarga', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: suratPindahId, step_number: 2, step_title: 'Data Pemohon', field_name: 'pemohon_kepala_keluarga', field_label: 'Nama Kepala Keluarga', field_type: 'text', is_required: true, display_order: 3 },

      { template_id: suratPindahId, step_number: 3, step_title: 'Alamat Sekarang (Tujuan)', field_name: 'tujuan_rt_rw', field_label: 'RT/RW Tujuan', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: suratPindahId, step_number: 3, step_title: 'Alamat Sekarang (Tujuan)', field_name: 'tujuan_desa', field_label: 'Desa/Kel Tujuan', field_type: 'text', is_required: true, display_order: 2 },
      { template_id: suratPindahId, step_number: 3, step_title: 'Alamat Sekarang (Tujuan)', field_name: 'tujuan_kecamatan', field_label: 'Kecamatan Tujuan', field_type: 'text', is_required: true, display_order: 3 },
      { template_id: suratPindahId, step_number: 3, step_title: 'Alamat Sekarang (Tujuan)', field_name: 'tujuan_kabupaten', field_label: 'Kabupaten/Kota Tujuan', field_type: 'text', is_required: true, display_order: 4 },
      { template_id: suratPindahId, step_number: 3, step_title: 'Alamat Sekarang (Tujuan)', field_name: 'tujuan_provinsi', field_label: 'Provinsi Tujuan', field_type: 'text', is_required: true, display_order: 5 },

      { template_id: suratPindahId, step_number: 4, step_title: 'Alamat Asal', field_name: 'asal_rt_rw', field_label: 'RT/RW Asal', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: suratPindahId, step_number: 4, step_title: 'Alamat Asal', field_name: 'asal_desa', field_label: 'Desa/Kel Asal', field_type: 'text', is_required: true, display_order: 2 },
      { template_id: suratPindahId, step_number: 4, step_title: 'Alamat Asal', field_name: 'asal_kecamatan', field_label: 'Kecamatan Asal', field_type: 'text', is_required: true, display_order: 3 },
      { template_id: suratPindahId, step_number: 4, step_title: 'Alamat Asal', field_name: 'alasan_pindah', field_label: 'Alasan Pindah', field_type: 'text', is_required: true, display_order: 4 },

      { template_id: suratPindahId, step_number: 5, step_title: 'Anggota Pindah', field_name: 'jumlah_anggota', field_label: 'Jumlah Anggota Keluarga yang Pindah', field_type: 'number', is_required: true, display_order: 1 },
      { template_id: suratPindahId, step_number: 5, step_title: 'Anggota Pindah', field_name: 'anggota_pindah', field_label: 'Daftar Anggota Pindah', field_type: 'dynamic_table', is_required: true, options: JSON.stringify([{name: 'nama', label: 'Nama'}, {name: 'nik', label: 'NIK'}, {name: 'tgl_lahir', label: 'Tanggal Lahir', type: 'date'}, {name: 'shdk', label: 'SHDK'}]), display_order: 2 },

      // Akta Kematian
      { template_id: aktaKematianId, step_number: 1, step_title: 'Data Lokasi & Kontak', field_name: 'email', field_label: 'E-mail', field_type: 'text', is_required: false, display_order: 1 },
      { template_id: aktaKematianId, step_number: 1, step_title: 'Data Lokasi & Kontak', field_name: 'provinsi', field_label: 'Provinsi', field_type: 'text', is_required: true, display_order: 2 },
      { template_id: aktaKematianId, step_number: 1, step_title: 'Data Lokasi & Kontak', field_name: 'kabupaten', field_label: 'Kabupaten/Kota', field_type: 'text', is_required: true, display_order: 3 },
      { template_id: aktaKematianId, step_number: 1, step_title: 'Data Lokasi & Kontak', field_name: 'kecamatan', field_label: 'Kecamatan', field_type: 'text', is_required: true, display_order: 4 },
      { template_id: aktaKematianId, step_number: 1, step_title: 'Data Lokasi & Kontak', field_name: 'desa', field_label: 'Desa/Kelurahan', field_type: 'text', is_required: true, display_order: 5 },
      { template_id: aktaKematianId, step_number: 1, step_title: 'Data Lokasi & Kontak', field_name: 'kode_wilayah', field_label: 'Kode Wilayah', field_type: 'text', is_required: true, display_order: 6 },

      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_nama', field_label: 'Nama Pelapor', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_nik', field_label: 'NIK Pelapor', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_no_dokumen', field_label: 'Nomor Dokumen Perjalanan', field_type: 'text', is_required: false, display_order: 3 },
      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_no_kk', field_label: 'Nomor Kartu Keluarga', field_type: 'number', is_required: true, display_order: 4 },
      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_kewarganegaraan', field_label: 'Kewarganegaraan', field_type: 'text', is_required: true, display_order: 5 },
      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_tempat_lahir', field_label: 'Tempat Lahir Pelapor (SPTJM)', field_type: 'text', is_required: true, display_order: 6 },
      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_tgl_lahir', field_label: 'Tanggal Lahir Pelapor (SPTJM)', field_type: 'date', is_required: true, display_order: 7 },
      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_pekerjaan', field_label: 'Pekerjaan Pelapor (SPTJM)', field_type: 'text', is_required: true, display_order: 8 },
      { template_id: aktaKematianId, step_number: 2, step_title: 'Data Pelapor', field_name: 'pelapor_alamat', field_label: 'Alamat Pelapor (SPTJM)', field_type: 'textarea', is_required: true, display_order: 9 },

      { template_id: aktaKematianId, step_number: 3, step_title: 'Data Saksi I', field_name: 'saksi1_nama', field_label: 'Nama Saksi I', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaKematianId, step_number: 3, step_title: 'Data Saksi I', field_name: 'saksi1_nik', field_label: 'NIK Saksi I', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaKematianId, step_number: 3, step_title: 'Data Saksi I', field_name: 'saksi1_no_kk', field_label: 'Nomor Kartu Keluarga', field_type: 'number', is_required: true, display_order: 3 },
      { template_id: aktaKematianId, step_number: 3, step_title: 'Data Saksi I', field_name: 'saksi1_kewarganegaraan', field_label: 'Kewarganegaraan', field_type: 'text', is_required: true, display_order: 4 },

      { template_id: aktaKematianId, step_number: 4, step_title: 'Data Saksi II', field_name: 'saksi2_nama', field_label: 'Nama Saksi II', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaKematianId, step_number: 4, step_title: 'Data Saksi II', field_name: 'saksi2_nik', field_label: 'NIK Saksi II', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaKematianId, step_number: 4, step_title: 'Data Saksi II', field_name: 'saksi2_no_kk', field_label: 'Nomor Kartu Keluarga', field_type: 'number', is_required: true, display_order: 3 },
      { template_id: aktaKematianId, step_number: 4, step_title: 'Data Saksi II', field_name: 'saksi2_kewarganegaraan', field_label: 'Kewarganegaraan', field_type: 'text', is_required: true, display_order: 4 },

      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ayah_nama', field_label: 'Nama Ayah', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ayah_nik', field_label: 'NIK Ayah', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ayah_tempat_lahir', field_label: 'Tempat Lahir Ayah', field_type: 'text', is_required: false, display_order: 3 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ayah_tgl_lahir', field_label: 'Tanggal Lahir Ayah', field_type: 'date', is_required: false, display_order: 4 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ayah_kewarganegaraan', field_label: 'Kewarganegaraan Ayah', field_type: 'text', is_required: true, display_order: 5 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ibu_nama', field_label: 'Nama Ibu', field_type: 'text', is_required: true, display_order: 6 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ibu_nik', field_label: 'NIK Ibu', field_type: 'number', is_required: true, display_order: 7 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ibu_tempat_lahir', field_label: 'Tempat Lahir Ibu', field_type: 'text', is_required: false, display_order: 8 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ibu_tgl_lahir', field_label: 'Tanggal Lahir Ibu', field_type: 'date', is_required: false, display_order: 9 },
      { template_id: aktaKematianId, step_number: 5, step_title: 'Data Orang Tua Jenazah', field_name: 'ibu_kewarganegaraan', field_label: 'Kewarganegaraan Ibu', field_type: 'text', is_required: true, display_order: 10 },

      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'meninggal_nama', field_label: 'Nama Lengkap Jenazah', field_type: 'text', is_required: true, display_order: 1 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'meninggal_nik', field_label: 'NIK Jenazah', field_type: 'number', is_required: true, display_order: 2 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'meninggal_tempat_lahir', field_label: 'Tempat Lahir Jenazah', field_type: 'text', is_required: true, display_order: 3 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'meninggal_tgl_lahir', field_label: 'Tanggal Lahir Jenazah', field_type: 'date', is_required: true, display_order: 4 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'anak_ke', field_label: 'Anak Ke', field_type: 'number', is_required: true, display_order: 5 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'tanggal_kematian', field_label: 'Tanggal Kematian', field_type: 'date', is_required: true, display_order: 6 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'pukul_kematian', field_label: 'Pukul Kematian (HH:MM)', field_type: 'text', is_required: true, display_order: 7 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'sebab_kematian', field_label: 'Sebab Kematian', field_type: 'radio', is_required: true, options: JSON.stringify(['1. Sakit biasa/tua', '2. Wabah penyakit', '3. Kecelakaan', '4. Kriminalitas', '5. Bunuh diri', '6. Lainnya']), display_order: 8 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'tempat_kematian', field_label: 'Tempat Kematian', field_type: 'text', is_required: true, display_order: 9 },
      { template_id: aktaKematianId, step_number: 6, step_title: 'Data Kematian (Jenazah)', field_name: 'yang_menerangkan', field_label: 'Yang Menerangkan', field_type: 'radio', is_required: true, options: JSON.stringify(['1. Dokter', '2. Tenaga Kesehatan', '3. Kepolisian', '4. Lainnya']), display_order: 10 }
    ];

    for (const field of fields) {
      await pool.query(
        `INSERT INTO form_definitions (template_id, step_number, step_title, field_name, field_label, field_type, is_required, options, display_order) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [field.template_id, field.step_number, field.step_title, field.field_name, field.field_label, field.field_type, field.is_required, field.options || null, field.display_order]
      );
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();

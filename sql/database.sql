CREATE DATABASE IF NOT EXISTS form_dukcapil;
USE form_dukcapil;

-- Master data: Provinces, Cities, Districts, Villages
CREATE TABLE provinces (
  id CHAR(2) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE cities (
  id CHAR(4) PRIMARY KEY,
  province_id CHAR(2) NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (province_id) REFERENCES provinces(id)
);

CREATE TABLE districts (
  id CHAR(7) PRIMARY KEY,
  city_id CHAR(4) NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE villages (
  id CHAR(10) PRIMARY KEY,
  district_id CHAR(7) NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- Users (Admin, Staff)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'staff') DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services / Form Templates (e.g. Akta Lahir, Surat Pindah)
CREATE TABLE form_templates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  pdf_template_path VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Form Definitions (Dynamic fields for each service)
CREATE TABLE form_definitions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  template_id INT NOT NULL,
  step_number INT NOT NULL,
  step_title VARCHAR(255),
  field_name VARCHAR(100) NOT NULL,
  field_label VARCHAR(255) NOT NULL,
  field_type ENUM('text', 'number', 'date', 'select', 'radio', 'textarea', 'file') NOT NULL,
  is_required BOOLEAN DEFAULT FALSE,
  options JSON, -- For select/radio (e.g., ["Laki-Laki", "Perempuan"])
  display_order INT DEFAULT 0,
  FOREIGN KEY (template_id) REFERENCES form_templates(id) ON DELETE CASCADE
);

-- Service Requirements (e.g. KK, KTP)
CREATE TABLE requirements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  template_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_mandatory BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (template_id) REFERENCES form_templates(id) ON DELETE CASCADE
);

-- Submissions
CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  template_id INT NOT NULL,
  status ENUM('draft', 'menunggu_verifikasi', 'diproses', 'perlu_revisi', 'selesai', 'ditolak') DEFAULT 'draft',
  keterangan_kepemilikan ENUM('Punya', 'Tidak', 'Redaksional') DEFAULT NULL,
  applicant_name VARCHAR(255),
  applicant_phone VARCHAR(20),
  submitted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES form_templates(id)
);

-- EAV Pattern: Submission Fields (Form Data)
CREATE TABLE submission_fields (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id INT NOT NULL,
  field_name VARCHAR(100) NOT NULL,
  field_value TEXT,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);

-- Uploads (Supporting documents & Generated PDFs)
CREATE TABLE uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id INT NOT NULL,
  requirement_id INT NULL, -- NULL if it's a generated PDF
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  is_generated_pdf BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE,
  FOREIGN KEY (requirement_id) REFERENCES requirements(id) ON DELETE SET NULL
);

-- Activity Logs (Audit)
CREATE TABLE activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL, -- Nullable because public user might submit
  submission_id INT NULL,
  activity VARCHAR(255) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);

-- Insert Sample Data
INSERT INTO users (name, email, password, role) VALUES 
('Super Admin', 'admin@dukcapil.local', '$2b$10$w8T9/7DDEQf.0fT2P/.T5.F8yU.5zT.tH3nZ5pL/f.F/M.T.F.Z', 'admin'); -- pass: password

INSERT INTO form_templates (name, slug, description) VALUES
('Akta Lahir', 'akta-lahir', 'Pembuatan Akta Kelahiran Baru'),
('Surat Pindah', 'surat-pindah', 'Pembuatan Surat Keterangan Pindah'),
('Akta Kematian', 'akta-kematian', 'Pembuatan Akta Kematian');

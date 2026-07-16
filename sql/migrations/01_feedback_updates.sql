-- Migration 01: Add keterangan_kepemilikan to submissions table
ALTER TABLE submissions
ADD COLUMN keterangan_kepemilikan ENUM('Punya', 'Tidak', 'Redaksional') DEFAULT NULL AFTER status;

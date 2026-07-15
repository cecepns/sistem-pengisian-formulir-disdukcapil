const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads-form-dukcapil')));

// Custom Middlewares
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Require Admin Role' });
  }
};

// ==========================================
// ROUTES & CONTROLLERS
// ==========================================

// --- Auth Routes ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/auth/profile', verifyToken, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: users[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Template Routes ---
app.get('/api/templates', async (req, res) => {
  try {
    const [templates] = await pool.query('SELECT * FROM form_templates WHERE is_active = TRUE');
    res.json({ success: true, data: templates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/templates/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [templates] = await pool.query('SELECT * FROM form_templates WHERE slug = ?', [slug]);
    
    if (templates.length === 0) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }
    const template = templates[0];

    const [fields] = await pool.query('SELECT * FROM form_definitions WHERE template_id = ? ORDER BY step_number, display_order', [template.id]);
    const [requirements] = await pool.query('SELECT * FROM requirements WHERE template_id = ?', [template.id]);

    res.json({
      success: true,
      data: { ...template, fields, requirements }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Dashboard Routes ---
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [total] = await pool.query('SELECT COUNT(*) as count FROM submissions');
    const [menunggu] = await pool.query('SELECT COUNT(*) as count FROM submissions WHERE status = "menunggu_verifikasi"');
    const [selesai] = await pool.query('SELECT COUNT(*) as count FROM submissions WHERE status = "selesai"');
    const [ditolak] = await pool.query('SELECT COUNT(*) as count FROM submissions WHERE status = "ditolak" OR status = "revisi"');
    
    const [recent] = await pool.query('SELECT s.*, t.name as template_name FROM submissions s JOIN form_templates t ON s.template_id = t.id ORDER BY s.created_at DESC LIMIT 5');

    res.json({
      success: true,
      data: {
        stats: {
          total: total[0].count,
          menunggu: menunggu[0].count,
          selesai: selesai[0].count,
          ditolak: ditolak[0].count
        },
        recent
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Submission Routes ---
// Public
app.post('/api/submissions', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { template_id, applicant_name, applicant_phone, fields } = req.body;
    
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.floor(10000 + Math.random() * 90000);
    const tracking_number = `DKP-${dateStr}-${randomStr}`;

    const [result] = await connection.query(
      `INSERT INTO submissions (tracking_number, template_id, status, applicant_name, applicant_phone, submitted_at) 
       VALUES (?, ?, 'menunggu_verifikasi', ?, ?, NOW())`,
      [tracking_number, template_id, applicant_name, applicant_phone]
    );

    const submissionId = result.insertId;

    if (fields && Array.isArray(fields)) {
      const fieldValues = fields.map(f => [submissionId, f.field_name, f.field_value]);
      if (fieldValues.length > 0) {
        await connection.query(
          `INSERT INTO submission_fields (submission_id, field_name, field_value) VALUES ?`,
          [fieldValues]
        );
      }
    }

    await connection.commit();
    res.json({ success: true, data: { tracking_number, id: submissionId } });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  } finally {
    connection.release();
  }
});

app.get('/api/submissions/track/:tracking_number', async (req, res) => {
  try {
    const { tracking_number } = req.params;
    const [rows] = await pool.query(
      `SELECT s.*, t.name as template_name 
       FROM submissions s
       JOIN form_templates t ON s.template_id = t.id
       WHERE s.tracking_number = ?`,
      [tracking_number]
    );

    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Not found' });
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin Submissions
app.get('/api/submissions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    let query = `SELECT s.*, t.name as template_name FROM submissions s JOIN form_templates t ON s.template_id = t.id`;
    let countQuery = `SELECT COUNT(*) as total FROM submissions s`;
    
    if (req.query.search) {
      query += ` WHERE s.applicant_name LIKE '%${req.query.search}%' OR s.tracking_number LIKE '%${req.query.search}%'`;
      countQuery += ` WHERE s.applicant_name LIKE '%${req.query.search}%' OR s.tracking_number LIKE '%${req.query.search}%'`;
    }

    query += ` ORDER BY s.created_at DESC LIMIT ? OFFSET ?`;

    const [rows] = await pool.query(query, [limit, offset]);
    const [countRows] = await pool.query(countQuery);
    
    res.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total: countRows[0].total,
        totalPages: Math.ceil(countRows[0].total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [submissions] = await pool.query(
      `SELECT s.*, t.name as template_name 
       FROM submissions s 
       JOIN form_templates t ON s.template_id = t.id 
       WHERE s.id = ?`, [id]
    );

    if (submissions.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengajuan tidak ditemukan' });
    }

    const submission = submissions[0];

    const [fields] = await pool.query(
      `SELECT field_name, field_value FROM submission_fields WHERE submission_id = ?`, [id]
    );

    res.json({
      success: true,
      data: { ...submission, fields }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/submissions/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const { id } = req.params;
    const { applicant_name, applicant_phone, fields } = req.body;

    await connection.query(
      `UPDATE submissions SET applicant_name = ?, applicant_phone = ? WHERE id = ?`,
      [applicant_name, applicant_phone, id]
    );

    if (fields && Array.isArray(fields)) {
      await connection.query(`DELETE FROM submission_fields WHERE submission_id = ?`, [id]);
      const fieldValues = fields.map(f => [id, f.field_name, f.field_value]);
      if (fieldValues.length > 0) {
        await connection.query(
          `INSERT INTO submission_fields (submission_id, field_name, field_value) VALUES ?`,
          [fieldValues]
        );
      }
    }

    await connection.commit();
    res.json({ success: true, message: 'Data berhasil diperbarui' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: 'Server error' });
  } finally {
    connection.release();
  }
});

app.put('/api/submissions/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query(`UPDATE submissions SET status = ? WHERE id = ?`, [status, id]);
    res.json({ success: true, message: 'Status diperbarui' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM submission_fields WHERE submission_id = ?`, [id]);
    await pool.query(`DELETE FROM submissions WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Pengajuan dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Region Routes ---
app.get('/api/regions/provinces', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM provinces ORDER BY name ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/regions/cities/:provinceId', async (req, res) => {
  try {
    const { provinceId } = req.params;
    const [rows] = await pool.query('SELECT * FROM cities WHERE province_id = ? ORDER BY name ASC', [provinceId]);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/regions/districts/:cityId', async (req, res) => {
  try {
    const { cityId } = req.params;
    const [rows] = await pool.query('SELECT * FROM districts WHERE city_id = ? ORDER BY name ASC', [cityId]);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/regions/villages/:districtId', async (req, res) => {
  try {
    const { districtId } = req.params;
    const [rows] = await pool.query('SELECT * FROM villages WHERE district_id = ? ORDER BY name ASC', [districtId]);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- User Routes ---
app.get('/api/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let query = 'SELECT id, name, email, role, created_at FROM users WHERE 1=1';
    let queryParams = [];

    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    const countQuery = query.replace('SELECT id, name, email, role, created_at', 'SELECT COUNT(*) as total');
    const [countResult] = await pool.query(countQuery, queryParams);
    const total = countResult[0].total;

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);
    
    const [users] = await pool.query(query, queryParams);

    res.json({
      success: true,
      data: users,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// --- Error Handling ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

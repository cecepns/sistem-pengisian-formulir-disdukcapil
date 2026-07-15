const pool = require('./config/db');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  try {
    const email = 'admin@dukcapil.local';
    const plainPassword = 'password';
    
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    if (users.length > 0) {
      // Update existing admin
      await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
      console.log('Admin user updated with new hashed password.');
    } else {
      // Insert new admin
      await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Super Admin', email, hashedPassword, 'admin']
      );
      console.log('Admin user created successfully.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();

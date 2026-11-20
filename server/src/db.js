import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, '../lavasa.sqlite'));
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, phone TEXT, role TEXT NOT NULL DEFAULT 'user', created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS complaints (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, service TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, address TEXT, latitude REAL, longitude REAL, image TEXT, status TEXT NOT NULL DEFAULT 'Pending', priority TEXT DEFAULT 'Normal', admin_note TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id));
`);
const adminEmail = process.env.ADMIN_EMAIL || 'admin@lavasa.local';
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
if (!db.prepare('SELECT id FROM users WHERE email=?').get(adminEmail)) {
  db.prepare('INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)').run('Lavasa Administrator', adminEmail, bcrypt.hashSync(adminPassword, 10), 'admin');
}
export default db;

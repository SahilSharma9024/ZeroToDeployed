import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '..', 'KinetiQ.db');
export const db = new DatabaseSync(dbPath);

// Enable Write-Ahead Logging for high-concurrency read/writes
db.exec(`PRAGMA journal_mode = WAL;`);
db.exec(`PRAGMA foreign_keys = ON;`);

// Create Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'athlete',
    age INTEGER DEFAULT 24,
    gender TEXT DEFAULT 'Male',
    height_cm REAL DEFAULT 178,
    weight_kg REAL DEFAULT 74,
    fitness_goal TEXT DEFAULT 'muscle_gain',
    emergency_name TEXT,
    emergency_phone TEXT,
    blood_group TEXT DEFAULT 'O+',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS daily_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    log_date TEXT NOT NULL,
    weight_kg REAL,
    water_liters REAL DEFAULT 0,
    calories_consumed INTEGER DEFAULT 0,
    calories_burned INTEGER DEFAULT 0,
    workout_completed INTEGER DEFAULT 0,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS venues (
    id TEXT PRIMARY KEY,
    osm_id TEXT UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'gym' or 'turf'
    sport TEXT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    address TEXT,
    rating REAL DEFAULT 4.7,
    is_indoor INTEGER DEFAULT 0,
    amenities TEXT, -- JSON array
    pricing TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS passes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    venue_id TEXT,
    venue_name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'fitness' or 'sports'
    title TEXT NOT NULL,
    event_date TEXT NOT NULL,
    cost TEXT DEFAULT 'FREE Trial',
    status TEXT DEFAULT 'confirmed',
    ticket_code TEXT UNIQUE NOT NULL,
    qr_signature TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS sos_beacons (
    id TEXT PRIMARY KEY,
    creator_id TEXT NOT NULL,
    creator_name TEXT NOT NULL,
    sport TEXT NOT NULL,
    venue_name TEXT NOT NULL,
    scheduled_time TEXT NOT NULL,
    players_needed INTEGER DEFAULT 1,
    urgency TEXT DEFAULT 'high',
    note TEXT,
    accepted_users TEXT DEFAULT '[]', -- JSON array
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS memories_cache (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    category TEXT NOT NULL, -- 'injury', 'nutrition', 'preference', 'milestone'
    content TEXT NOT NULL,
    confidence REAL DEFAULT 0.95,
    source TEXT DEFAULT 'conversation',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert default seed user (Aarav Sharma demo athlete)
const checkUserStmt = db.prepare('SELECT id FROM users WHERE id = ?');
const defaultUser = checkUserStmt.get('usr-aarav-demo');

if (!defaultUser) {
  // bcrypt hash for 'KinetiQ123'
  const defaultHash = '$2a$10$wT0lPZp07fQh2Zz7jL5fbeoK629.yY9KSm3y1kK2uEw9zE0Gk8t3K';
  const insertUser = db.prepare(`
    INSERT INTO users (
      id, email, password_hash, name, phone, role, age, gender, height_cm, weight_kg, fitness_goal, blood_group
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertUser.run(
    'usr-aarav-demo',
    'aarav@KinetiQ.io',
    defaultHash,
    'Aarav Sharma',
    '+91 98765 43210',
    'athlete',
    24,
    'Male',
    178,
    74.5,
    'hypertrophy',
    'B+'
  );

  // Insert initial Hindsight persistent memories for Aarav
  const insertMemory = db.prepare(`
    INSERT INTO memories_cache (id, user_id, category, content, confidence, source)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertMemory.run(
    'mem-1',
    'usr-aarav-demo',
    'injury',
    'Right rotator cuff impingement suffered during overhead shoulder press in Jan 2026. Strictly avoid behind-the-neck presses.',
    0.98,
    'physio_intake'
  );

  insertMemory.run(
    'mem-2',
    'usr-aarav-demo',
    'nutrition',
    'Lactose sensitive: exhibits gastrointestinal distress with whey concentrate. Prefers plant-based pea/brown rice protein or egg whites.',
    0.95,
    'diet_consult'
  );

  insertMemory.run(
    'mem-3',
    'usr-aarav-demo',
    'milestone',
    'Hit 100kg clean barbell back squat for 5 repetitions on 15 Oct 2026.',
    0.99,
    'workout_log'
  );

  // Insert default verified venues for Hyderabad and Bengaluru
  const insertVenue = db.prepare(`
    INSERT INTO venues (
      id, osm_id, name, type, sport, latitude, longitude, address, rating, is_indoor, amenities, pricing
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertVenue.run(
    'ven-osm-hyd-1',
    'osm-node-101',
    'Cult.fit - Banjara Hills Elite',
    'gym',
    'Functional Training & Strength',
    17.4156,
    78.4357,
    'Road No. 12, Banjara Hills, Hyderabad',
    4.9,
    1,
    JSON.stringify(['Olympic Barbells', 'Sauna', 'Strength Floor', 'Shower', 'Valet Parking']),
    '₹3,200 / month'
  );

  insertVenue.run(
    'ven-osm-hyd-2',
    'osm-node-102',
    'Gachibowli Sports Arena & Turf',
    'turf',
    'Football',
    17.4435,
    78.3489,
    'Near Bio-Diversity Park, Gachibowli, Hyderabad',
    4.8,
    0,
    JSON.stringify(['FIFA Approved 50mm Turf', 'LED Floodlights', 'Dugouts', 'Locker Room']),
    '₹1,200 / hour'
  );

  insertVenue.run(
    'ven-osm-hyd-3',
    'osm-node-103',
    'Iron Asylum Hardcore Gym',
    'gym',
    'Bodybuilding & Powerlifting',
    17.4399,
    78.4983,
    'Secunderabad Club Road, Hyderabad',
    4.7,
    1,
    JSON.stringify(['Eleiko Plates', 'Monolift', 'Chalk Allowed', 'Dumbbells to 70kg']),
    '₹2,500 / month'
  );

  insertVenue.run(
    'ven-osm-blr-1',
    'osm-node-104',
    'Koramangala Football Arena (KFA)',
    'turf',
    'Football & Cricket',
    12.9345,
    77.6265,
    '5th Block, Koramangala, Bengaluru',
    4.9,
    0,
    JSON.stringify(['Night Floodlights', 'Bibs Provided', 'Cafe', 'Parking']),
    '₹1,400 / hour'
  );
}

console.log('📦 SQLite database initialized successfully at', dbPath);


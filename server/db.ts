import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.resolve(process.cwd(), 'kinetix.db');
export const db = new Database(dbPath);

// Enable WAL mode for high-concurrency performance
db.pragma('journal_mode = WAL');

export function initDatabase() {
  // 1. Users & Athlete Profiles
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      phone_country_code TEXT DEFAULT '+91',
      phone TEXT,
      role TEXT CHECK(role IN ('athlete', 'trainer')) DEFAULT 'athlete',
      age INTEGER,
      gender TEXT,
      unit_system TEXT CHECK(unit_system IN ('metric', 'imperial')) DEFAULT 'metric',
      height_cm REAL,
      weight_kg REAL,
      fitness_goal TEXT,
      experience_level TEXT,
      blood_group TEXT,
      medical_clearance INTEGER DEFAULT 0,
      emergency_name TEXT,
      emergency_phone TEXT,
      streak_days INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS daily_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      log_date DATE NOT NULL,
      weight_kg REAL,
      water_ml INTEGER DEFAULT 0,
      calories_consumed INTEGER DEFAULT 0,
      workouts_completed INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS venues (
      id TEXT PRIMARY KEY,
      osm_id TEXT UNIQUE,
      name TEXT NOT NULL,
      type TEXT CHECK(type IN ('gym', 'turf')) NOT NULL,
      sport_category TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      address TEXT,
      rating REAL DEFAULT 4.5,
      is_indoor INTEGER DEFAULT 1,
      amenities TEXT
    );

    CREATE TABLE IF NOT EXISTS passes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      venue_or_event_id TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      ticket_code TEXT UNIQUE NOT NULL,
      venue_name TEXT NOT NULL,
      event_date TEXT NOT NULL,
      status TEXT CHECK(status IN ('Confirmed', 'Checked-in', 'Expired')) DEFAULT 'Confirmed',
      cost TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS sos_beacons (
      id TEXT PRIMARY KEY,
      host_id TEXT NOT NULL,
      sport TEXT NOT NULL,
      venue_name TEXT NOT NULL,
      required_players INTEGER NOT NULL,
      filled_players INTEGER DEFAULT 0,
      match_time TEXT NOT NULL,
      skill_tier TEXT NOT NULL,
      cost_share_per_head TEXT NOT NULL,
      status TEXT CHECK(status IN ('Open', 'Filled', 'Cancelled')) DEFAULT 'Open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (host_id) REFERENCES users(id)
    );
  `);

  // Seed default demo accounts if not present
  seedDefaultAccounts();
}

function seedDefaultAccounts() {
  const existingAthlete = db.prepare('SELECT id FROM users WHERE email = ?').get('athlete@kinetix.com');
  if (!existingAthlete) {
    const salt = bcrypt.genSaltSync(10);
    const athleteHash = bcrypt.hashSync('kinetix123', salt);
    const trainerHash = bcrypt.hashSync('kinetix123', salt);

    const insertUser = db.prepare(`
      INSERT INTO users (
        id, name, email, password_hash, phone_country_code, phone,
        role, age, gender, unit_system, height_cm, weight_kg,
        fitness_goal, experience_level, blood_group, medical_clearance,
        emergency_name, emergency_phone, streak_days
      ) VALUES (
        @id, @name, @email, @password_hash, @phone_country_code, @phone,
        @role, @age, @gender, @unit_system, @height_cm, @weight_kg,
        @fitness_goal, @experience_level, @blood_group, @medical_clearance,
        @emergency_name, @emergency_phone, @streak_days
      )
    `);

    insertUser.run({
      id: 'usr-demo-athlete',
      name: 'Aarav Sharma',
      email: 'athlete@kinetix.com',
      password_hash: athleteHash,
      phone_country_code: '+91',
      phone: '9876543210',
      role: 'athlete',
      age: 23,
      gender: 'Male',
      unit_system: 'metric',
      height_cm: 178,
      weight_kg: 74,
      fitness_goal: 'fat_loss',
      experience_level: 'Intermediate',
      blood_group: 'O+',
      medical_clearance: 1,
      emergency_name: 'Dr. Vivek Sharma',
      emergency_phone: '+91 9876500000',
      streak_days: 7,
    });

    insertUser.run({
      id: 'usr-demo-trainer',
      name: 'Coach Rahul Varma',
      email: 'trainer@kinetix.com',
      password_hash: trainerHash,
      phone_country_code: '+91',
      phone: '9811223344',
      role: 'trainer',
      age: 32,
      gender: 'Male',
      unit_system: 'metric',
      height_cm: 183,
      weight_kg: 82,
      fitness_goal: 'muscle_gain',
      experience_level: 'Pro',
      blood_group: 'B+',
      medical_clearance: 1,
      emergency_name: 'Pooja Varma',
      emergency_phone: '+91 9811223300',
      streak_days: 28,
    });

    console.log('✓ Seeded default demo accounts: athlete@kinetix.com & trainer@kinetix.com');
  }
}

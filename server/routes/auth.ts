import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'KinetiQ_super_secret_jwt_2026_sports_os';

// Register New Athlete / Coach
authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      password,
      name,
      phone,
      role = 'athlete',
      age = 24,
      gender = 'Male',
      height_cm = 175,
      weight_kg = 72,
      fitness_goal = 'muscle_gain',
      emergency_name,
      emergency_phone,
      blood_group = 'O+'
    } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Name, email, and password are required' });
      return;
    }

    const checkStmt = db.prepare('SELECT id FROM users WHERE email = ?');
    const existing = checkStmt.get(email.toLowerCase().trim());
    if (existing) {
      res.status(409).json({ error: 'User with this email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const insertStmt = db.prepare(`
      INSERT INTO users (
        id, email, password_hash, name, phone, role, age, gender,
        height_cm, weight_kg, fitness_goal, emergency_name, emergency_phone, blood_group
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      userId,
      email.toLowerCase().trim(),
      passwordHash,
      name.trim(),
      phone || null,
      role,
      Number(age),
      gender,
      Number(height_cm),
      Number(weight_kg),
      fitness_goal,
      emergency_name || null,
      emergency_phone || null,
      blood_group
    );

    const token = jwt.sign(
      { userId, email: email.toLowerCase().trim(), role, name: name.trim() },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Athlete registered successfully',
      token,
      user: {
        id: userId,
        email: email.toLowerCase().trim(),
        name: name.trim(),
        phone,
        role,
        age: Number(age),
        gender,
        height_cm: Number(height_cm),
        weight_kg: Number(weight_kg),
        fitness_goal,
        blood_group
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register athlete' });
  }
});

// Login
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email.toLowerCase().trim()) as any;

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials. User not found.' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid credentials. Password incorrect.' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { password_hash: _, ...safeUser } = user;
    res.json({
      message: 'Login successful',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to process login' });
  }
});

// Get Current Authenticated Profile
authRouter.get('/me', (req: Request, res: Response): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized. Bearer token missing.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(decoded.userId) as any;

    if (!user) {
      res.status(404).json({ error: 'User record not found' });
      return;
    }

    const { password_hash: _, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (error) {
    res.status(401).json({ error: 'Session expired or invalid token' });
  }
});

// Update Profile Details
authRouter.put('/profile', (req: Request, res: Response): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const {
      name,
      phone,
      age,
      gender,
      height_cm,
      weight_kg,
      fitness_goal,
      emergency_name,
      emergency_phone,
      blood_group
    } = req.body;

    const updateStmt = db.prepare(`
      UPDATE users SET
        name = COALESCE(?, name),
        phone = COALESCE(?, phone),
        age = COALESCE(?, age),
        gender = COALESCE(?, gender),
        height_cm = COALESCE(?, height_cm),
        weight_kg = COALESCE(?, weight_kg),
        fitness_goal = COALESCE(?, fitness_goal),
        emergency_name = COALESCE(?, emergency_name),
        emergency_phone = COALESCE(?, emergency_phone),
        blood_group = COALESCE(?, blood_group)
      WHERE id = ?
    `);

    updateStmt.run(
      name,
      phone,
      age ? Number(age) : null,
      gender,
      height_cm ? Number(height_cm) : null,
      weight_kg ? Number(weight_kg) : null,
      fitness_goal,
      emergency_name,
      emergency_phone,
      blood_group,
      decoded.userId
    );

    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const updated = stmt.get(decoded.userId) as any;
    const { password_hash: _, ...safeUser } = updated;

    res.json({ message: 'Profile updated successfully', user: safeUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


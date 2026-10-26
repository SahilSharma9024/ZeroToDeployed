import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import crypto from 'crypto';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'kinetix_super_secret_jwt_2026';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string;
}

// Auth Middleware to protect sensitive endpoints
export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

// Helper: Sanitize DB user record to frontend UserProfile format
function formatUserProfile(user: any) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneCountryCode: user.phone_country_code || '+91',
    phone: user.phone || '',
    avatar: user.role === 'trainer'
      ? 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: user.role || 'athlete',
    age: user.age || 22,
    gender: user.gender || 'Male',
    unitSystem: user.unit_system || 'metric',
    heightCm: user.height_cm || 175,
    weightKg: user.weight_kg || 70,
    fitnessGoal: user.fitness_goal || 'fat_loss',
    experienceLevel: user.experience_level || 'Intermediate',
    primarySports: user.role === 'trainer' ? ['Strength Training', 'CrossFit'] : ['Football', 'Badminton'],
    jerseySize: 'L',
    emergencyContact: {
      name: user.emergency_name || 'Emergency Contact',
      phone: user.emergency_phone || '',
      relation: 'Family / Guardian',
    },
    medicalClearance: Boolean(user.medical_clearance),
    bloodGroup: user.blood_group || 'O+',
    city: 'Hyderabad',
    turfElo: user.role === 'trainer' ? 1750 : 1420,
    streakDays: user.streak_days || 1,
    lastCheckInDate: new Date().toISOString().split('T')[0],
  };
}

// 1. POST /api/auth/register
authRouter.post('/register', (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role = 'athlete',
      phone = '',
      phoneCountryCode = '+91',
      age = 22,
      gender = 'Male',
      heightCm = 175,
      weightKg = 70,
      fitnessGoal = 'fat_loss',
      experienceLevel = 'Intermediate',
      bloodGroup = 'O+',
      emergencyName = '',
      emergencyPhone = '',
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const userId = `usr-${crypto.randomUUID()}`;

    const insert = db.prepare(`
      INSERT INTO users (
        id, name, email, password_hash, phone_country_code, phone,
        role, age, gender, unit_system, height_cm, weight_kg,
        fitness_goal, experience_level, blood_group, medical_clearance,
        emergency_name, emergency_phone, streak_days
      ) VALUES (
        @id, @name, @email, @password_hash, @phone_country_code, @phone,
        @role, @age, @gender, 'metric', @height_cm, @weight_kg,
        @fitness_goal, @experience_level, @blood_group, 1,
        @emergency_name, @emergency_phone, 1
      )
    `);

    insert.run({
      id: userId,
      name: name.trim(),
      email: normalizedEmail,
      password_hash: passwordHash,
      phone_country_code: phoneCountryCode,
      phone: phone.trim(),
      role: role === 'trainer' ? 'trainer' : 'athlete',
      age: Number(age),
      gender,
      height_cm: Number(heightCm),
      weight_kg: Number(weightKg),
      fitness_goal: fitnessGoal,
      experience_level: experienceLevel,
      blood_group: bloodGroup,
      emergency_name: emergencyName.trim(),
      emergency_phone: emergencyPhone.trim(),
    });

    const createdUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    const token = jwt.sign({ id: userId, role: createdUser?.role || role }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: formatUserProfile(createdUser),
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error during registration' });
  }
});

// 2. POST /api/auth/login
authRouter.post('/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail) as any;

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      message: 'Login successful',
      token,
      user: formatUserProfile(user),
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error during login' });
  }
});

// 3. GET /api/auth/me (Protected)
authRouter.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId) as any;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      user: formatUserProfile(user),
    });
  } catch (error: any) {
    console.error('Get me error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// 4. PUT /api/auth/profile (Protected)
authRouter.put('/profile', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      name,
      phone,
      phoneCountryCode,
      age,
      gender,
      heightCm,
      weightKg,
      unitSystem,
      fitnessGoal,
      experienceLevel,
      bloodGroup,
      emergencyName,
      emergencyPhone,
      role,
    } = req.body;

    const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId) as any;
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }

    const update = db.prepare(`
      UPDATE users SET
        name = COALESCE(?, name),
        phone = COALESCE(?, phone),
        phone_country_code = COALESCE(?, phone_country_code),
        age = COALESCE(?, age),
        gender = COALESCE(?, gender),
        height_cm = COALESCE(?, height_cm),
        weight_kg = COALESCE(?, weight_kg),
        unit_system = COALESCE(?, unit_system),
        fitness_goal = COALESCE(?, fitness_goal),
        experience_level = COALESCE(?, experience_level),
        blood_group = COALESCE(?, blood_group),
        emergency_name = COALESCE(?, emergency_name),
        emergency_phone = COALESCE(?, emergency_phone),
        role = COALESCE(?, role)
      WHERE id = ?
    `);

    update.run(
      name ?? existing.name,
      phone ?? existing.phone,
      phoneCountryCode ?? existing.phone_country_code,
      age ?? existing.age,
      gender ?? existing.gender,
      heightCm ?? existing.height_cm,
      weightKg ?? existing.weight_kg,
      unitSystem ?? existing.unit_system,
      fitnessGoal ?? existing.fitness_goal,
      experienceLevel ?? existing.experience_level,
      bloodGroup ?? existing.blood_group,
      emergencyName ?? existing.emergency_name,
      emergencyPhone ?? existing.emergency_phone,
      role ?? existing.role,
      req.userId
    );

    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId) as any;
    return res.json({
      message: 'Profile updated successfully',
      user: formatUserProfile(updatedUser),
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return res.status(500).json({ error: error.message || 'Failed to update profile' });
  }
});

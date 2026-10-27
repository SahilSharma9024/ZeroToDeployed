import { Router, Request, Response } from 'express';
import crypto from 'node:crypto';
import { db } from '../db.js';

export const passesRouter = Router();

// Issue a Cryptographically Signed Pass (Free Trial or Turf Booking)
passesRouter.post('/issue', (req: Request, res: Response): void => {
  try {
    const {
      userId,
      venueId,
      venueName,
      category, // 'fitness' or 'sports'
      title,
      eventDate = new Date().toISOString().split('T')[0],
      cost = 'FREE Trial'
    } = req.body;

    if (!userId || !venueName || !category || !title) {
      res.status(400).json({ error: 'userId, venueName, category, and title are required' });
      return;
    }

    const passId = `pass-${Date.now()}`;
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    const cityCode = venueName.toLowerCase().includes('hyderabad') ? 'HYD' : 'BLR';
    const ticketCode = `KTX-2026-${cityCode}-${randomHex}`;

    // Cryptographic signature for tamper-proof gate check-in
    const secret = process.env.JWT_SECRET || 'kinetix_pass_secret';
    const qrSignature = crypto
      .createHmac('sha256', secret)
      .update(`${ticketCode}:${userId}:${eventDate}`)
      .digest('hex');

    const insertStmt = db.prepare(`
      INSERT INTO passes (
        id, user_id, venue_id, venue_name, category, title, event_date, cost, status, ticket_code, qr_signature
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      passId,
      userId,
      venueId || null,
      venueName,
      category,
      title,
      eventDate,
      cost,
      'confirmed',
      ticketCode,
      qrSignature
    );

    res.status(201).json({
      message: 'Pass issued successfully',
      pass: {
        id: passId,
        userId,
        venueName,
        category,
        title,
        eventDate,
        cost,
        status: 'confirmed',
        ticketCode,
        qrSignature
      }
    });
  } catch (error) {
    console.error('Pass issuance error:', error);
    res.status(500).json({ error: 'Failed to issue pass' });
  }
});

// Get User's Active Passes
passesRouter.get('/my-passes/:userId', (req: Request, res: Response): void => {
  try {
    const { userId } = req.params;
    const stmt = db.prepare(`
      SELECT * FROM passes
      WHERE user_id = ?
      ORDER BY created_at DESC
    `);

    const passes = stmt.all(String(userId));
    res.json({ passes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve passes' });
  }
});

// Verify Ticket Code at Gym/Turf Gate Check-in
passesRouter.get('/verify/:ticketCode', (req: Request, res: Response): void => {
  try {
    const { ticketCode } = req.params;
    const stmt = db.prepare(`
      SELECT p.*, u.name as athlete_name, u.phone as athlete_phone
      FROM passes p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.ticket_code = ?
    `);

    const pass = stmt.get(String(ticketCode)) as any;

    if (!pass) {
      res.status(404).json({ valid: false, message: 'Invalid or counterfeit ticket code' });
      return;
    }

    res.json({
      valid: true,
      message: 'Pass verified. Access granted.',
      pass: {
        id: pass.id,
        ticketCode: pass.ticket_code,
        venue: pass.venue_name,
        title: pass.title,
        athlete: pass.athlete_name || 'Registered Athlete',
        date: pass.event_date,
        status: pass.status,
        cost: pass.cost
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Pass verification service error' });
  }
});


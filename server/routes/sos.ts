import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const sosRouter = Router();

// Get Active Ghost Sub & Match SOS Beacons
sosRouter.get('/beacons', (_req: Request, res: Response): void => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM sos_beacons
      WHERE status = 'active'
      ORDER BY created_at DESC
    `);

    const rawBeacons = stmt.all() as any[];
    const beacons = rawBeacons.map((b) => ({
      ...b,
      acceptedUsers: JSON.parse(b.accepted_users || '[]')
    }));

    res.json({ beacons });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve SOS beacons' });
  }
});

// Create New Ghost Sub Beacon
sosRouter.post('/create', (req: Request, res: Response): void => {
  try {
    const {
      creatorId,
      creatorName,
      sport,
      venueName,
      scheduledTime,
      playersNeeded = 1,
      urgency = 'high',
      note = ''
    } = req.body;

    if (!creatorId || !creatorName || !sport || !venueName) {
      res.status(400).json({ error: 'creatorId, creatorName, sport, and venueName are required' });
      return;
    }

    const beaconId = `sos-${Date.now()}`;
    const insertStmt = db.prepare(`
      INSERT INTO sos_beacons (
        id, creator_id, creator_name, sport, venue_name, scheduled_time,
        players_needed, urgency, note, accepted_users, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `);

    insertStmt.run(
      beaconId,
      creatorId,
      creatorName,
      sport,
      venueName,
      scheduledTime,
      Number(playersNeeded),
      urgency,
      note,
      JSON.stringify([])
    );

    res.status(201).json({ message: 'Ghost Sub beacon broadcasted', beaconId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to broadcast beacon' });
  }
});

// Join Beacon (1-Tap Emergency Sub)
sosRouter.post('/join/:beaconId', (req: Request, res: Response): void => {
  try {
    const { beaconId } = req.params;
    const { userName } = req.body;

    if (!userName) {
      res.status(400).json({ error: 'userName is required' });
      return;
    }

    const getStmt = db.prepare('SELECT * FROM sos_beacons WHERE id = ?');
    const beacon = getStmt.get(String(beaconId)) as any;

    if (!beacon) {
      res.status(404).json({ error: 'Beacon not found' });
      return;
    }

    const accepted: string[] = JSON.parse(beacon.accepted_users || '[]');
    if (!accepted.includes(userName)) {
      accepted.push(userName);
    }

    const remainingNeeded = Math.max(0, beacon.players_needed - 1);
    const newStatus = remainingNeeded === 0 ? 'filled' : 'active';

    const updateStmt = db.prepare(`
      UPDATE sos_beacons
      SET accepted_users = ?, players_needed = ?, status = ?
      WHERE id = ?
    `);

    updateStmt.run(JSON.stringify(accepted), remainingNeeded, newStatus, String(beaconId));

    res.json({ message: 'Joined team as Ghost Sub!', remainingNeeded });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join team' });
  }
});


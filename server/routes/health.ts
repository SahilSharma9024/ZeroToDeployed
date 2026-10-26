import { Router, Request, Response } from 'express';
import { db } from '../db';
import crypto from 'crypto';

export const healthRouter = Router();

// POST /api/health/calculate
healthRouter.post('/calculate', (req: Request, res: Response) => {
  try {
    const {
      weight_kg,
      height_cm,
      age,
      gender = 'Male',
      activity_level = 1.55,
    } = req.body;

    const w = Number(weight_kg);
    const h = Number(height_cm);
    const a = Number(age);
    const act = Number(activity_level);

    if (!w || !h || !a) {
      return res.status(400).json({ error: 'weight_kg, height_cm, and age are required numbers' });
    }

    const heightM = h / 100;
    const bmi = Math.round((w / (heightM * heightM)) * 10) / 10;
    const bmiPrime = Math.round((bmi / 25) * 100) / 100;
    const ponderalIndex = Math.round((w / Math.pow(heightM, 3)) * 10) / 10;

    let bmiCategory = 'Normal';
    let bmiColor = '#10b981'; // emerald
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = '#3b82f6';
    } else if (bmi >= 25 && bmi < 29.9) {
      bmiCategory = 'Overweight';
      bmiColor = '#f59e0b';
    } else if (bmi >= 30) {
      bmiCategory = 'Obese';
      bmiColor = '#ef4444';
    }

    // Clinical Mifflin-St Jeor Formula
    const bmrMifflin = Math.round(
      gender === 'Male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161
    );

    // Clinical Harris-Benedict Formula
    const bmrHarrisBenedict = Math.round(
      gender === 'Male'
        ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
        : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a
    );

    const tdee = Math.round(bmrMifflin * act);
    const waterLiters = Math.round((w * 0.035) * 10) / 10;
    const waterOz = Math.round(waterLiters * 33.814);

    const proteinMinG = Math.round(w * 1.8);
    const proteinMaxG = Math.round(w * 2.2);

    return res.json({
      metrics: {
        bmi,
        bmiPrime,
        ponderalIndex,
        bmiCategory,
        bmiColor,
        bmrMifflin,
        bmrHarrisBenedict,
        tdee,
        waterLiters,
        waterOz,
        proteinRange: `${proteinMinG}g - ${proteinMaxG}g`,
      },
      targets: {
        maintenance: tdee,
        fatLossMild: tdee - 300,
        fatLossStandard: tdee - 500,
        muscleGainLean: tdee + 300,
        muscleGainBulk: tdee + 500,
      },
      macros: {
        fatLoss: {
          proteinG: proteinMaxG,
          fatsG: Math.round(((tdee - 500) * 0.25) / 9),
          carbsG: Math.round(((tdee - 500) - (proteinMaxG * 4 + (((tdee - 500) * 0.25)))) / 4),
        },
        muscleGain: {
          proteinG: proteinMinG,
          fatsG: Math.round(((tdee + 300) * 0.25) / 9),
          carbsG: Math.round(((tdee + 300) - (proteinMinG * 4 + (((tdee + 300) * 0.25)))) / 4),
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Calculation error' });
  }
});

// POST /api/health/log
healthRouter.post('/log', (req: Request, res: Response) => {
  try {
    const { userId, weightKg, waterMl, caloriesConsumed, workoutsCompleted } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const today = new Date().toISOString().split('T')[0];
    const logId = `log-${crypto.randomUUID()}`;

    const insert = db.prepare(`
      INSERT INTO daily_logs (id, user_id, log_date, weight_kg, water_ml, calories_consumed, workouts_completed)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      logId,
      userId,
      today,
      weightKg || null,
      waterMl || 0,
      caloriesConsumed || 0,
      workoutsCompleted || 0
    );

    return res.json({ success: true, message: 'Daily biometrics logged', logId });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Logging error' });
  }
});

import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const healthRouter = Router();

// Mifflin-St Jeor Clinical BMR, BMI, TDEE & Macro Calculator
healthRouter.post('/calculate', (req: Request, res: Response): void => {
  try {
    const {
      heightCm,
      weightKg,
      age,
      gender = 'Male',
      activityLevel = 1.55, // 1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 very, 1.9 athlete
      goal = 'maintain' // 'fat_loss', 'maintain', 'muscle_gain'
    } = req.body;

    const h = Number(heightCm);
    const w = Number(weightKg);
    const a = Number(age);
    const act = Number(activityLevel);

    if (!h || !w || !a) {
      res.status(400).json({ error: 'heightCm, weightKg, and age are required' });
      return;
    }

    // 1. BMI calculation
    const heightM = h / 100;
    const bmi = Number((w / (heightM * heightM)).toFixed(1));

    let bmiCategory = 'Normal / Healthy Weight';
    let riskLevel = 'Low risk';
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      riskLevel = 'Nutritional deficit risk';
    } else if (bmi <= 24.9) {
      bmiCategory = 'Normal / Healthy Weight';
      riskLevel = 'Lowest clinical risk';
    } else if (bmi <= 29.9) {
      bmiCategory = 'Overweight';
      riskLevel = 'Moderate cardiovascular caution';
    } else {
      bmiCategory = 'Obese Class';
      riskLevel = 'Elevated metabolic strain';
    }

    // 2. Mifflin-St Jeor BMR
    // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    const bmr = Math.round(
      gender.toLowerCase() === 'female'
        ? 10 * w + 6.25 * h - 5 * a - 161
        : 10 * w + 6.25 * h - 5 * a + 5
    );

    // 3. TDEE
    const tdee = Math.round(bmr * act);

    // 4. Goal adjusted caloric intake
    let targetCalories = tdee;
    if (goal === 'fat_loss') targetCalories = Math.round(tdee - 500);
    else if (goal === 'muscle_gain') targetCalories = Math.round(tdee + 350);

    // 5. Macronutrient distribution
    // Protein: 2.0g per kg for athletes
    const proteinGrams = Math.round(w * 2.0);
    const proteinCalories = proteinGrams * 4;

    // Fats: 25% of target calories
    const fatCalories = Math.round(targetCalories * 0.25);
    const fatGrams = Math.round(fatCalories / 9);

    // Carbs: Remaining calories
    const carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
    const carbGrams = Math.round(carbCalories / 4);

    // 6. Hydration target
    // 35ml per kg of bodyweight
    const waterLiters = Number((w * 0.035).toFixed(1));

    // 7. Healthy weight range for height
    const minHealthyWeight = Number((18.5 * heightM * heightM).toFixed(1));
    const maxHealthyWeight = Number((24.9 * heightM * heightM).toFixed(1));

    res.json({
      metrics: {
        bmi,
        bmiCategory,
        riskLevel,
        bmr,
        tdee,
        targetCalories,
        healthyWeightRange: { min: minHealthyWeight, max: maxHealthyWeight }
      },
      macros: {
        protein: { grams: proteinGrams, calories: proteinCalories, percent: Math.round((proteinCalories / targetCalories) * 100) },
        carbs: { grams: carbGrams, calories: carbCalories, percent: Math.round((carbCalories / targetCalories) * 100) },
        fats: { grams: fatGrams, calories: fatCalories, percent: Math.round((fatCalories / targetCalories) * 100) }
      },
      hydration: {
        dailyLiters: waterLiters,
        glassesCount: Math.round(waterLiters / 0.25)
      }
    });
  } catch (error) {
    console.error('Health calculation error:', error);
    res.status(500).json({ error: 'Failed to compute metabolic health metrics' });
  }
});

// Commit Daily Health Log to SQLite
healthRouter.post('/daily-log', (req: Request, res: Response): void => {
  try {
    const {
      userId,
      logDate = new Date().toISOString().split('T')[0],
      weightKg,
      waterLiters = 0,
      caloriesConsumed = 0,
      caloriesBurned = 0,
      workoutCompleted = 0,
      notes = ''
    } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    const logId = `log-${Date.now()}`;
    const insertStmt = db.prepare(`
      INSERT INTO daily_logs (
        id, user_id, log_date, weight_kg, water_liters, calories_consumed,
        calories_burned, workout_completed, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      logId,
      userId,
      logDate,
      weightKg ? Number(weightKg) : null,
      Number(waterLiters),
      Number(caloriesConsumed),
      Number(caloriesBurned),
      workoutCompleted ? 1 : 0,
      notes
    );

    res.status(201).json({ message: 'Daily log committed successfully', logId });
  } catch (error) {
    console.error('Daily log save error:', error);
    res.status(500).json({ error: 'Failed to save daily log' });
  }
});

// Get User's Recent Health Logs
healthRouter.get('/logs/:userId', (req: Request, res: Response): void => {
  try {
    const { userId } = req.params;
    const stmt = db.prepare(`
      SELECT * FROM daily_logs
      WHERE user_id = ?
      ORDER BY log_date DESC
      LIMIT 30
    `);

    const logs = stmt.all(String(userId));
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
});


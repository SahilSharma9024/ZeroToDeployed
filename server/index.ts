import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db';
import { authRouter } from './routes/auth';
import { healthRouter } from './routes/health';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Boot Database
initDatabase();

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/health', healthRouter);

// Root & Health Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    app: 'KINETIX Sports & Fitness OS',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`⚡ KINETIX Server running on http://localhost:${PORT}`);
});

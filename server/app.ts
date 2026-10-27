import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// Initialize database schema
import './db.js';

// Import Route Handlers
import { authRouter } from './routes/auth.js';
import { healthRouter } from './routes/health.js';
import { venuesRouter } from './routes/venues.js';
import { passesRouter } from './routes/passes.js';
import { sosRouter } from './routes/sos.js';
import { agentRouter } from './routes/agent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health-check', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    app: 'KinetiQ Sports & Fitness OS',
    version: '2.0.0-production',
    database: 'SQLite (Native WAL Mode)',
    memoryEngine: 'Hindsight by Vectorize',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/health', healthRouter);
app.use('/api/venues', venuesRouter);
app.use('/api/passes', passesRouter);
app.use('/api/sos', sosRouter);
app.use('/api/agent', agentRouter);

// Serve Frontend in Production mode
const distPath = path.resolve(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Express 5 regex wildcard catch-all for SPA navigation
  app.get(/.*/, (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

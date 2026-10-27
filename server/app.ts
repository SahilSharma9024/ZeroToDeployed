import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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
    app: 'KINETIX Sports & Fitness OS',
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

// Production Static Asset Serving (For single-process AWS EC2 Linux deployment)
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req: Request, res: Response) => {
    // If request does not start with /api, serve SPA index.html
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      res.status(404).json({ error: 'Endpoint not found' });
    }
  });
}


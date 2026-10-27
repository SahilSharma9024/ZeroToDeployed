import { Router, Request, Response } from 'express';
import { runCoachAgent } from '../agent/coachAgent.js';
import { recallMemories, retainMemory } from '../agent/hindsight.js';

export const agentRouter = Router();

// Execute Hindsight AI Coach Loop
agentRouter.post('/coach', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId = 'usr-aarav-demo', message, history = [] } = req.body;

    if (!message) {
      res.status(400).json({ error: 'message is required' });
      return;
    }

    const result = await runCoachAgent(userId, message, history);
    res.json(result);
  } catch (error) {
    console.error('Coach agent execution error:', error);
    res.status(500).json({ error: 'Failed to process AI coach request' });
  }
});

// Get User's Active Hindsight Memory Bank
agentRouter.get('/memories/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const memories = await recallMemories(String(userId));
    res.json({ memories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch athlete memory bank' });
  }
});

// Manually Add a Constraint / Memory to Hindsight
agentRouter.post('/memories/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { category, content } = req.body;

    if (!category || !content) {
      res.status(400).json({ error: 'category and content are required' });
      return;
    }

    const memory = await retainMemory(String(userId), category, content, 'manual_profile_entry');
    res.status(201).json({ message: 'Memory persisted into Hindsight', memory });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retain memory' });
  }
});


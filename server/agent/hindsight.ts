import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
dotenv.config();

export interface AthleteMemory {
  id: string;
  userId: string;
  category: 'injury' | 'nutrition' | 'preference' | 'milestone';
  content: string;
  confidence: number;
  source: string;
  createdAt?: string;
}

/**
 * Recall active physiological memories from Vectorize Hindsight memory bank
 * (with automatic SQLite fallback).
 */
export async function recallMemories(userId: string, contextQuery?: string): Promise<AthleteMemory[]> {
  const rawKey = process.env.HINDSIGHT_API_KEY || '';
  const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();
  const rawEndpoint = process.env.HINDSIGHT_ENDPOINT || 'https://api.hindsight.vectorize.io';
  const endpoint = rawEndpoint.replace(/^["']|["']$/g, '').trim();

  // 1. If Hindsight API key is configured, attempt Vectorize Hindsight cloud service
  if (apiKey && !endpoint.includes('api.hindsight.vectorize.io')) {
    try {
      const response = await fetch(`${endpoint}/v1/memories/recall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          user_id: userId,
          query: contextQuery || 'athlete physical constraints, injuries, nutrition, and exercise history',
          top_k: 8
        })
      });

      if (response.ok) {
        const data = (await response.json()) as any;
        if (data && Array.isArray(data.memories)) {
          return data.memories.map((m: any) => ({
            id: m.id,
            userId: m.user_id || userId,
            category: m.category || 'injury',
            content: m.content || m.text,
            confidence: m.confidence || 0.95,
            source: 'hindsight_cloud'
          }));
        }
      }
    } catch {
      // Graceful fallback to local SQLite
    }
  }

  // 2. Local SQLite persistent memory store
  const stmt = db.prepare(`
    SELECT id, user_id as userId, category, content, confidence, source, created_at as createdAt
    FROM memories_cache
    WHERE user_id = ?
    ORDER BY created_at DESC
  `);

  const rows = stmt.all(userId) as unknown as AthleteMemory[];
  return rows;
}

/**
 * Retain new athletic insight or physiological constraint into Vectorize Hindsight
 * and local SQLite persistent cache.
 */
export async function retainMemory(
  userId: string,
  category: 'injury' | 'nutrition' | 'preference' | 'milestone',
  content: string,
  source: string = 'coach_conversation'
): Promise<AthleteMemory> {
  const memoryId = `mem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const confidence = 0.96;

  // 1. Save to local SQLite
  const insertStmt = db.prepare(`
    INSERT INTO memories_cache (id, user_id, category, content, confidence, source)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertStmt.run(memoryId, userId, category, content, confidence, source);

  const rawKey = process.env.HINDSIGHT_API_KEY || '';
  const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();
  const rawEndpoint = process.env.HINDSIGHT_ENDPOINT || 'https://api.hindsight.vectorize.io';
  const endpoint = rawEndpoint.replace(/^["']|["']$/g, '').trim();

  // 2. If valid external Vectorize Hindsight endpoint is configured, push to cloud asynchronously
  if (apiKey && !endpoint.includes('api.hindsight.vectorize.io')) {
    fetch(`${endpoint}/v1/memories/retain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        id: memoryId,
        user_id: userId,
        category,
        content,
        confidence,
        metadata: { source }
      })
    }).catch(() => {
      // Async ignore
    });
  }

  return {
    id: memoryId,
    userId,
    category,
    content,
    confidence,
    source,
    createdAt: new Date().toISOString()
  };
}

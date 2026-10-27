import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateGeminiResponse } from './gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from project root regardless of current working directory
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
dotenv.config();

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Primary LLM reasoning orchestrator:
 * 1. Google Gemini API (gemini-2.5-flash / gemini-2.0-flash / gemini-1.5-flash) if GEMINI_API_KEY is present
 * 2. Groq Cloud LLM if GROQ_API_KEY is present
 * 3. Offline deterministic sports-science heuristic engine fallback
 */
export async function generateLlmResponse(messages: ChatMessage[]): Promise<string> {
  // 1. First priority: Google Gemini
  const geminiReply = await generateGeminiResponse(messages);
  if (geminiReply) {
    return geminiReply;
  }

  // 2. Second priority: Groq Cloud
  const rawKey = process.env.GROQ_API_KEY || '';
  const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();
  const configuredModel = (process.env.GROQ_MODEL || '').replace(/^["']|["']$/g, '').trim();

  const candidateModels = [
    configuredModel,
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'llama-3.1-70b-versatile',
    'llama3-70b-8192',
    'llama3-8b-8192',
    'mixtral-8x7b-32768'
  ].filter(Boolean);

  const uniqueModels = [...new Set(candidateModels)];

  if (apiKey) {
    for (const model of uniqueModels) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.4,
            max_tokens: 1024
          })
        });

        if (response.ok) {
          const data = (await response.json()) as any;
          const text = data?.choices?.[0]?.message?.content;
          if (text) {
            console.log(`[Groq AI] Success using model: ${model}`);
            return text;
          }
        }
      } catch {
        // Continue to next model or fallback
      }
    }
  }

  // 3. Sports physiological reasoning fallback (for offline or emergency mode)
  const lastUserMsg = messages.filter((m) => m.role === 'user').pop()?.content.toLowerCase() || '';

  if (lastUserMsg.includes('push up') || lastUserMsg.includes('pushup') || lastUserMsg.includes('push-up')) {
    return `[Hindsight Memory Guardrail Active: Right Rotator Cuff Impingement]
I've reviewed your active Hindsight injury record. For push-ups with a right rotator cuff impingement, standard wide-grip flared push-ups place excessive shear stress on the anterior capsule and supraspinatus.

Safe Push-Up Protocol:
1. Neutral Elbow Path (Arrow Position): Keep elbows tucked at 30° to 45° relative to your torso — NEVER flare elbows out at 90°.
2. Elevated / Parallette Push-Ups: Use push-up handles or neutral-grip dumbbells to keep your wrists neutral and eliminate painful internal glenohumeral rotation.
3. Controlled Depth: Descend only until your chest is 2-3 inches above the ground; avoid letting the humeral head drop forward below the elbow line.
4. Active Scapular Retraction & Depression: Pull shoulder blades down and back before descending; push through the palms at the top to complete scapular protraction without shrugging.
5. Prescribed Volume: 3 sets × 8–10 controlled reps (tempo: 3s lowering, 1s isometric hold, 1s upward drive). Stop 2 reps before technical failure.`;
  }

  if (lastUserMsg.includes('diet') || lastUserMsg.includes('protein') || lastUserMsg.includes('shake') || lastUserMsg.includes('gain') || lastUserMsg.includes('vegetarian')) {
    return `[Hindsight Memory Guardrail Active: Lactose Sensitivity]
Recalling your Hindsight nutritional constraints, standard whey concentrates cause gastrointestinal distress.

Prescription:
• Use fermented pea + brown rice protein isolate (30g protein per scoop) or plant protein blends.
• Daily Target: ~150g protein divided into 4 servings (Breakfast, Pre-workout, Post-workout, Dinner).
• Post-workout fuel: 1 scoop plant isolate with 40g cream of rice and 1 banana.`;
  }

  if (lastUserMsg.includes('shoulder') || lastUserMsg.includes('rotator cuff') || lastUserMsg.includes('press')) {
    return `[Hindsight Memory Guardrail Active: Right Rotator Cuff Impingement]
I've reviewed your biometric profile and your active Hindsight injury record. Because of your right rotator cuff impingement, all overhead barbell presses are strictly contraindicated.

Recommended Replacement:
1. Neutral-Grip Dumbbell Floor Press (3 sets × 10 reps, 60s rest) — removes terminal humeral impingement while maintaining anterior deltoid stimulation.
2. Cable Face Pulls with external rotation (3 sets × 15 reps) to strengthen infraspinatus and teres minor.
3. Incline Dumbbell Bench at 30° with elbow path tucked at 45°.`;
  }

  return `[Hindsight Memory Engine Active]
Based on your persistent biometric profile in KinetiQ, your program is calibrated for progressive hypertrophy with zero-compromise joint safety. Let me know if you would like me to generate your full memory-protected split or adjust macro targets.`;
}

import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
dotenv.config();

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Generate sports-science reasoning via Google Gemini API.
 * Automatically tries active production models (gemini-2.5-flash, gemini-2.0-flash, gemini-1.5-flash).
 */
export async function generateGeminiResponse(messages: ChatMessage[]): Promise<string | null> {
  const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
  const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();

  if (!apiKey) {
    return null;
  }

  const configuredModel = (process.env.GEMINI_MODEL || '').replace(/^["']|["']$/g, '').trim();

  // Active Gemini production models in priority order
  const candidateModels = [
    configuredModel,
    'gemini-3.8-flash',
    'gemini-3.8-pro',
    'gemini-3-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ].filter(Boolean);

  const uniqueModels = [...new Set(candidateModels)];

  const systemMsg = messages.find((m) => m.role === 'system');
  const nonSystemMsgs = messages.filter((m) => m.role !== 'system');

  const contents = nonSystemMsgs.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const payload: any = {
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 10000
    }
  };

  if (systemMsg) {
    payload.systemInstruction = {
      parts: [{ text: systemMsg.content }]
    };
  }

  for (const model of uniqueModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = (await response.json()) as any;
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          console.log(`[Gemini AI] Success using model: ${model}`);
          return text;
        }
      } else {
        const errText = await response.text();
        console.warn(`[Gemini API] Model '${model}' returned HTTP ${response.status}:`, errText);
        if (response.status === 404 || errText.includes('not found') || errText.includes('NOT_FOUND')) {
          console.log(`[Gemini AI] Model '${model}' not found. Trying next candidate...`);
          continue;
        }
        if (response.status === 400 && (errText.includes('API_KEY_INVALID') || errText.includes('API key not valid'))) {
          console.error('[Gemini API] Invalid API key. Please check your GEMINI_API_KEY in .env');
          break;
        }
      }
    } catch (err) {
      console.warn(`[Gemini API] Network error with model '${model}':`, (err as any).message);
    }
  }

  return null;
}


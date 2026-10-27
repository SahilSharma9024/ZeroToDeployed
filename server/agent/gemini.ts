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
 * Automatically handles strict Gemini role-alternation rules, token limits, and candidate failovers.
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

  // Gemini API strict turn rules:
  // 1. Must start with a 'user' turn (cannot start with 'model')
  // 2. Turns must strictly alternate between 'user' and 'model'
  // 3. Must end with a 'user' turn
  // 4. Parts must not be empty
  const normalizedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  for (const m of nonSystemMsgs) {
    const text = (m.content || '').trim();
    if (!text) continue;

    const role: 'user' | 'model' = m.role === 'assistant' ? 'model' : 'user';

    // Discard leading 'model' turns (e.g. coach initial welcome greeting)
    if (normalizedContents.length === 0 && role === 'model') {
      continue;
    }

    const prev = normalizedContents[normalizedContents.length - 1];
    if (prev && prev.role === role) {
      // Merge consecutive same-role messages to guarantee strict alternation
      prev.parts[0].text += `\n\n${text}`;
    } else {
      normalizedContents.push({
        role,
        parts: [{ text }]
      });
    }
  }

  // Ensure there is at least one turn and that it ends with the user message
  if (normalizedContents.length === 0) {
    const lastUser = nonSystemMsgs.filter((m) => m.role === 'user').pop();
    normalizedContents.push({
      role: 'user',
      parts: [{ text: lastUser?.content || 'Hello Coach' }]
    });
  } else if (normalizedContents[normalizedContents.length - 1].role !== 'user') {
    const lastUser = nonSystemMsgs.filter((m) => m.role === 'user').pop();
    normalizedContents.push({
      role: 'user',
      parts: [{ text: lastUser?.content || 'Continue' }]
    });
  }

  const payload: any = {
    contents: normalizedContents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 4096 // Gemini standard production ceiling (avoids 400 error from >8192)
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

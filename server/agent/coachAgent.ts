import { recallMemories, retainMemory, type AthleteMemory } from './hindsight.js';
import { generateLlmResponse, type ChatMessage } from './groq.js';
import { db } from '../db.js';

export interface CoachSessionResult {
  reply: string;
  recalledMemories: AthleteMemory[];
  newlyRetainedMemories: AthleteMemory[];
  guardrailsTriggered: string[];
}

/**
 * 3-Phase Hindsight Cognitive Architecture for Sports & Fitness:
 * 1. RECALL: Query Vectorize Hindsight memory bank for active athlete constraints
 * 2. REASON: LLM applies hypertrophy/sports science with strict injury avoidance guardrails
 * 3. RETAIN: Asynchronously discover & persist new athlete milestones/injuries into Hindsight
 */
export async function runCoachAgent(
  userId: string,
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<CoachSessionResult> {
  // -------------------------------------------------------------
  // PHASE 1: RECALL (Vectorize Hindsight)
  // -------------------------------------------------------------
  const recalledMemories = await recallMemories(userId, userMessage);

  // Retrieve user biometrics from SQLite
  const userStmt = db.prepare('SELECT * FROM users WHERE id = ?');
  const user = userStmt.get(userId) as any;

  // Format memories into active guardrail instructions
  const memoryContext = recalledMemories
    .map((m) => `• [${m.category.toUpperCase()}]: ${m.content} (Confidence: ${(m.confidence * 100).toFixed(0)}%)`)
    .join('\n');

  // -------------------------------------------------------------
  // PHASE 2: REASON (Groq Cloud LLM with Injected Constraints)
  // -------------------------------------------------------------
  const guardrailsTriggered: string[] = [];
  const lowerMsg = userMessage.toLowerCase();

  if (
    recalledMemories.some((m) => m.category === 'injury' && m.content.toLowerCase().includes('rotator cuff')) &&
    (lowerMsg.includes('shoulder') || lowerMsg.includes('press') || lowerMsg.includes('chest') || lowerMsg.includes('workout'))
  ) {
    guardrailsTriggered.push('ROTATOR_CUFF_OVERHEAD_RESTRICTION');
  }

  if (
    recalledMemories.some((m) => m.category === 'nutrition' && m.content.toLowerCase().includes('lactose')) &&
    (lowerMsg.includes('diet') || lowerMsg.includes('protein') || lowerMsg.includes('shake') || lowerMsg.includes('whey'))
  ) {
    guardrailsTriggered.push('DAIRY_WHEY_ELIMINATION_PROTOCOL');
  }

  const systemPrompt = `You are KinetiQ AI Coach, an elite sports science and strength conditioning trainer powered by Vectorize Hindsight persistent memory.
You are coaching athlete ${user?.name || 'Athlete'} (Age: ${user?.age || 24}, Height: ${user?.height_cm || 178}cm, Weight: ${user?.weight_kg || 74}kg, Goal: ${user?.fitness_goal || 'Hypertrophy'}).

CRITICAL SAFETY DIRECTIVE:
You have retrieved the athlete's persistent memory bank from Hindsight:
${memoryContext || '• No previous physiological constraints on file.'}

MANDATORY RULES:
1. NEVER prescribe an exercise that violates an active INJURY memory (e.g. if rotator cuff impingement is present, ban behind-the-neck presses, upright rows, or extreme internal rotation; suggest floor presses or neutral grip dumbbells).
2. NEVER prescribe meal items that violate a NUTRITION memory (e.g. if lactose sensitive, forbid whey concentrate; mandate plant isolate or egg whites).
3. Be encouraging, concise, scientific, and clear. Format workout splits with sets, reps, and rest intervals.`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-6),
    { role: 'user', content: userMessage }
  ];

  const reply = await generateLlmResponse(messages);

  // -------------------------------------------------------------
  // PHASE 3: RETAIN (Discover and Commit New Insights into Hindsight)
  // -------------------------------------------------------------
  const newlyRetainedMemories: AthleteMemory[] = [];

  // Automated discovery of new constraints in conversation
  if (lowerMsg.includes('sprained') || lowerMsg.includes('hurt my') || lowerMsg.includes('injured') || lowerMsg.includes('tear')) {
    const retained = await retainMemory(userId, 'injury', userMessage, 'live_chat_injury_report');
    newlyRetainedMemories.push(retained);
  } else if (lowerMsg.includes('allergic to') || lowerMsg.includes('cannot eat') || lowerMsg.includes('vegan') || lowerMsg.includes('keto')) {
    const retained = await retainMemory(userId, 'nutrition', userMessage, 'live_chat_diet_preference');
    newlyRetainedMemories.push(retained);
  } else if (lowerMsg.includes('pr of') || lowerMsg.includes('benched') || lowerMsg.includes('squatted') || lowerMsg.includes('new record')) {
    const retained = await retainMemory(userId, 'milestone', userMessage, 'live_chat_pr_report');
    newlyRetainedMemories.push(retained);
  }

  return {
    reply,
    recalledMemories,
    newlyRetainedMemories,
    guardrailsTriggered
  };
}


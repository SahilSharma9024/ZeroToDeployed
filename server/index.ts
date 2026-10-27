import { app } from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 KinetiQ Production OS Server listening on port ${PORT}`);
  console.log(`📦 Database: KinetiQ.db (SQLite with Node.js Sync Engine)`);
  console.log(`🧠 AI Engine: Vectorize Hindsight + Groq High-Speed LLM`);
  console.log(`🌍 Geolocation: OpenStreetMap Overpass Live Integration`);
  console.log(`=======================================================`);
});


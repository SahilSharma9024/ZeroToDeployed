import { spawn } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

console.log('==================================================================');
console.log('⚡ Starting KINETIX Full-Stack OS (Backend API + Vite Frontend)...');
console.log(`📁 Project Directory: ${projectRoot}`);
console.log('==================================================================');

const isWin = process.platform === 'win32';
const npxCmd = isWin ? 'npx.cmd' : 'npx';

// 1. Start Express Server (port 5000)
const server = spawn(npxCmd, ['tsx', 'server/index.ts'], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: isWin,
});

// 2. Start Vite Dev Server (port 5173 with proxy to 5000)
const vite = spawn(npxCmd, ['vite'], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: isWin,
});

function cleanup() {
  console.log('\n🛑 Shutting down KINETIX services...');
  server.kill('SIGTERM');
  vite.kill('SIGTERM');
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

server.on('exit', (code) => {
  if (code && code !== 0) {
    console.error(`Backend server exited with code ${code}`);
  }
});

vite.on('exit', (code) => {
  if (code && code !== 0) {
    console.error(`Vite exited with code ${code}`);
  }
});


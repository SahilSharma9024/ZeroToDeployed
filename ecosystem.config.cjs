module.exports = {
  apps: [
    {
      name: 'KinetiQ-app',
      script: 'node_modules/tsx/dist/cli.mjs',
      args: 'server/index.ts',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 80
      }
    }
  ]
};


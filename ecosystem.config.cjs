module.exports = {
  apps: [
    {
      name: 'kinetix-app',
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


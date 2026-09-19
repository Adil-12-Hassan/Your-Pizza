// Process entry point: start listening + graceful shutdown.
import { config } from './config/env.js';
import app from './app.js';

const server = app.listen(config.port, () => {
  console.log(`API listening on port ${config.port} (${config.env})`);
});

const shutdown = (signal) => {
  console.log(`${signal} received, shutting down...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  shutdown('unhandledRejection');
});

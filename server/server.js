import app from './src/app.js';
import connectDB from './src/config/db.js';
import env from './src/config/env.js';

let server;

const startServer = async () => {
  await connectDB();
  server = app.listen(env.PORT, () => {
    console.log(`P4 Properties API running on port ${env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  if (server) server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  if (server) server.close(() => process.exit(0));
});

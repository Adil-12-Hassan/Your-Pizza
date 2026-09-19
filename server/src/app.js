// Builds the Express app (no listening here, which keeps it testable).
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import { corsOptions } from './config/cors.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

app.set('trust proxy', 1); // behind Render/Railway/Vercel proxies: correct client IP for rate limiting
app.disable('x-powered-by');

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
if (!config.isProd) app.use(morgan('dev'));

app.use('/api', apiLimiter, routes);

app.use(notFound);
app.use(errorHandler);

export default app;

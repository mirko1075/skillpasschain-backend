import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

import userRoutes from '@v1/routes/user.routes';
import { notFound } from '@middlewares/notFound';
import { errorHandler } from '@middlewares/errorHandler';
import assessmentRoutes from '@v1/routes/assessment.routes';
import certificationRoutes from '@v1/routes/certification.routes';
import institutionRoutes from '@v1/routes/institution.routes';
import authRoutes from '@v1/routes/auth.routes';
import adminRoutes from '@v1/routes/admin.routes';
import topicsRoutes from '@v1/routes/topic.routes';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK' });
});

// API Versioned Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use('/api/v1/assessments', assessmentRoutes);
app.use('/api/v1/certifications', certificationRoutes);
app.use('/api/v1/institutions', institutionRoutes);
app.use('/api/v1/topics', topicsRoutes);
// Not Found and Error Handlers
app.use(notFound);
app.use(errorHandler);

export default app;

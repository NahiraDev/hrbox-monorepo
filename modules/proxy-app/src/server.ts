import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { corsConfig } from './config/cors.config.js';
import { proxyConfig, serverConfig } from './config/proxy.config.js';
import { loggerMiddleware } from './middleware/logger.middleware';
import { errorMiddleware } from './middleware/error.middleware';

// بارگذاری متغیرهای محیطی
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS
app.use(cors(corsConfig));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(loggerMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'CORS Proxy Server',
    target: proxyConfig.target,
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'CORS Proxy Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      proxy: '/api/*',
    },
  });
});

// Proxy middleware
app.use(
  '/api',
  createProxyMiddleware({
    ...proxyConfig,
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying: ${req.method} ${req.url} -> ${proxyConfig.target}${req.url}`);

      proxyReq.setHeader('Origin', proxyConfig.target);
      proxyReq.removeHeader('Referer');

      if (req.body && Object.keys(req.body).length > 0) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).json({
        error: 'Proxy Error',
        message: err.message,
      });
    },
  })
);

// Error handling
app.use(errorMiddleware);

// Start server
app.listen(serverConfig.port, serverConfig.host, () => {
  console.log('='.repeat(50));
  console.log('🚀 CORS Proxy Server Started!');
  console.log('='.repeat(50));
  console.log(`📡 Server: http://${serverConfig.host}:${serverConfig.port}`);
  console.log(`🎯 Target: ${proxyConfig.target}`);
  console.log(`🌍 Environment: ${serverConfig.env}`);
  console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

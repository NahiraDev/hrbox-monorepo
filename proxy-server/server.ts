import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { corsConfig, proxyConfig, serverConfig } from '@hrbox/proxy-server/config/index';
import { loggerMiddleware } from '@hrbox/proxy-server/middleware/logger.middleware';
import { errorMiddleware } from '@hrbox/proxy-server/middleware/error.middleware';

dotenv.config();

const app: Express = express();

// ✅ Security & Performance Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));
app.use(compression());
app.use(morgan('combined'));

app.use(cors(corsConfig));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(loggerMiddleware);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: serverConfig.env,
  });
});

// ✅ Proxy Configuration with Enhanced Error Handling
const proxyMiddleware = createProxyMiddleware({
  target: proxyConfig.target,
  changeOrigin: true,
  secure: false,
  followRedirects: true,
  timeout: proxyConfig.timeout,

  pathRewrite: (path) => {
    const newPath = path.replace(/^\/api/, '/DesktopModules');
    console.log(`🔄 Path Rewrite: ${path} → ${newPath}`);
    return newPath;
  },

  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Host', 'hrlink.hrbox.me');
    proxyReq.setHeader('Origin', 'https://hrlink.hrbox.me');
    proxyReq.setHeader('Referer', 'https://hrlink.hrbox.me');

    console.log(`📤 Proxying: ${req.method} ${req.url}`);
    console.log(`📍 Target: ${proxyConfig.target}${proxyReq.path}`);

    if (req.body && Object.keys(req.body).length > 0) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },

  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin || '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,PATCH,OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization,X-Requested-With,Accept,Origin';

    console.log(`📥 Response: ${proxyRes.statusCode} ${req.url}`);
  },

  // ✅ Error Handler
  onError: (err, req, res) => {
    console.error('❌ Proxy Error:', err.message);
    console.error('🔍 Request:', req.method, req.url);

    res.status(502).json({
      error: 'Bad Gateway',
      message: 'خطا در اتصال به سرور اصلی',
      details: serverConfig.env === 'development' ? err.message : undefined,
      timestamp: new Date().toISOString(),
    });
  },
});

// ✅ Apply Proxy to /api routes
app.use('/api', proxyMiddleware);

// ✅ Catch 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'مسیر درخواستی یافت نشد',
    path: req.url,
    timestamp: new Date().toISOString(),
  });
});

// ✅ Global Error Handler
app.use(errorMiddleware);

// ✅ Start Server
const server = app.listen(serverConfig.port, serverConfig.host, () => {
  console.log('\n🚀 Proxy Server Started Successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Server: http://${serverConfig.host}:${serverConfig.port}`);
  console.log(`🎯 Target: ${proxyConfig.target}`);
  console.log(`🌍 Environment: ${serverConfig.env}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

// ✅ Graceful Shutdown
const gracefulShutdown = () => {
  console.log('\n⚠️  Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('❌ Forced shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default app;

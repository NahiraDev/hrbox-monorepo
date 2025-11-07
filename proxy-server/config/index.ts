import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://front.hrbox.me',
      'http://front.hrbox.me',
      'http://localhost:5173',
      'https://localhost:5173',
      'http://127.0.0.1:5173',
      'https://10.64.65.2',
      undefined,
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️  Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-File-Name',
    'X-CSRF-Token',
  ],
  exposedHeaders: [
    'Content-Range',
    'X-Content-Range',
    'Content-Length',
    'Content-Disposition',
  ],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export const proxyConfig = {
  target: process.env.TARGET_API || 'https://10.64.65.2',
  pathRewrite: {
    '^/api': '/DesktopModules',
  },
  changeOrigin: true,
  secure: false,
  followRedirects: true,
  timeout: 30000, // 30 seconds
  proxyTimeout: 30000,

  headers: {
    'Host': 'front.hrbox.me',
    'Origin': 'https://front.hrbox.me',
    'Referer': 'https://front.hrbox.me/',
    'User-Agent': 'HRBox-Proxy-Server/1.0',
  },
};

export const serverConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',
  env: process.env.NODE_ENV || 'development',
  trustProxy: true,
};

export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'تعداد درخواست‌های شما بیش از حد مجاز است',
  standardHeaders: true,
  legacyHeaders: false,
};

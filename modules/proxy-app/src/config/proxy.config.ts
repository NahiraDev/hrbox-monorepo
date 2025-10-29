export const proxyConfig = {
  target: process.env.TARGET_API || 'https://hrlink.hrbox.me',
  pathRewrite: {
    '^/api': '/DesktopModules',
  },
  changeOrigin: true,
  secure: false,
  followRedirects: true,
  timeout: 30000,
};

export const serverConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',
  env: process.env.NODE_ENV || 'development',
};

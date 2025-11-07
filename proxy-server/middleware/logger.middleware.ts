import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  console.log(`📨 [${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.headers.origin) {
    console.log(`   Origin: ${req.headers.origin}`);
  }

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusEmoji = res.statusCode >= 400 ? '❌' : '✅';

    console.log(
      `${statusEmoji} [${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};

import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('❌ Error occurred:');
  console.error(`   Path: ${req.method} ${req.url}`);
  console.error(`   Message: ${err.message}`);
  console.error(`   Stack: ${err.stack}`);

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development'
      ? err.message
      : 'خطا در پردازش درخواست',
    path: req.url,
    timestamp: new Date().toISOString(),
  });
};

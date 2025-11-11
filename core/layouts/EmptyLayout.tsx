import { ReactNode } from 'react';

interface EmptyLayoutProps {
  children: ReactNode;
}

export function EmptyLayout({ children }: EmptyLayoutProps) {
  return (
    <div className="min-h-screen bg-panel-background">
      {children}
    </div>
  );
}
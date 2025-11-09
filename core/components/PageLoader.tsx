import { Suspense, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from "@heroui/react";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Spinner size="lg" color="primary" />
          </motion.div>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <Spinner size="lg" color="primary" />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </Suspense>
  );
}
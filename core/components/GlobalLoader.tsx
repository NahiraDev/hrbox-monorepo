import { AnimatePresence, motion } from "framer-motion";

export function GlobalLoader() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary-300 to-primary  z-9999"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={
          { opacity: 1, scaleX: 1 }
        }
        exit={{ opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          className="h-full bg-linear-to-r from-transparent via-white to-transparent"
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

import { Link as TanStackLink, type LinkProps } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export function Link(props: LinkProps) {
  return (
    <TanStackLink
      {...props}
      className={`hover:opacity-80 transition-opacity`}
    />
  );
}

// With animation
export function AnimatedLink(props: LinkProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <TanStackLink {...props} />
    </motion.div>
  );
}
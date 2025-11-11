import { motion } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { IconProps } from "iconsax-reactjs";

interface AppDocItemProps {
  icon: React.ComponentType<IconProps>;
  module: string;
  path?: string;
  outlined?: boolean;
  index: number;
}

export const AppDocItem: React.FC<AppDocItemProps> = ({
                                                        icon: Icon,
                                                        module,
                                                        path,
                                                        outlined = false,
                                                        index
                                                      }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (path) {
      const currentPath = window.location.pathname;
      setIsActive(currentPath.includes(path));
    }
  }, [path]);

  const handleClick = () => {
    if (path) {
      navigate({ to: path });
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center justify-center"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
    >
      <motion.button
        onClick={handleClick}
        className="group flex flex-col items-center justify-center w-20 cursor-pointer"
      >
        {/* Icon Container */}
        <motion.div
          className={`
            flex items-center justify-center rounded-xl transition-all duration-200
            relative overflow-hidden w-16 h-16
            ${
            outlined
              ? "border border-dashed border-neutral-400 dark:border-white bg-transparent"
              : isActive
                ? "bg-gradient-to-br from-panel-primary to-primary-300 text-white shadow-lg"
                : "bg-gradient-to-t from-neutral-200 to-white dark:from-neutral-700 dark:to-neutral-600 text-secondary-900 dark:text-white hover:shadow-md"
          }
          `}
          whileHover={!outlined ? { scale: 1.05 } : undefined}
        >
          {/* Shimmer Effect */}
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          <Icon
            className={`
              relative z-10 transition-all duration-200
              ${isActive ? "text-white" : "text-secondary-700 dark:text-white"}
            `}
            size={28}
            variant={outlined ? "Outline" : "Bold"}
          />
        </motion.div>

        {/* Label */}
        <motion.span
          className={`
            whitespace-nowrap text-xs font-semibold mt-2 transition-all duration-200
            max-w-[70px] text-center truncate
            ${
            isActive
              ? "opacity-100 text-panel-primary dark:text-white"
              : "opacity-0 group-hover:opacity-100 text-secondary-600 dark:text-neutral-300"
          }
          `}
        >
          {module}
        </motion.span>
      </motion.button>
    </motion.div>
  );
};
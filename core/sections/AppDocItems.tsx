import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface AppDocItemProps {
  icon: React.ComponentType<any>;
  module: string;
  outlined?: boolean;
  mouseX: any;
  index: number;
}

const AppDocItem: React.FC<AppDocItemProps> = ({
                                                 icon: Icon,
                                                 module,
                                                 outlined = false,
                                               }) => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  const currentPath = location.pathname.split('/')[1] || '';
  const isActive = module.toLowerCase() === currentPath.toLowerCase();

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center justify-center"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.button className="group flex flex-col items-center justify-center w-20">
        <motion.div
          className={`
            flex items-center justify-center rounded-xl transition-all duration-200 relative overflow-hidden
            w-16 h-16
            ${
            outlined
              ? 'border border-dashed dark:border-white bg-transparent dark:text-white'
              : isActive
                ? 'bg-gradient-to-b from-[#1E3363] to-[#3D68C9] text-white dark:bg-gradient-to-t dark:from-[#064368] dark:to-[#BAD9EC] dark:text-white'
                : 'bg-gradient-to-t from-[#DCE0E3] to-white dark:to-[rgba(4,66,92,0.4)] dark:text-white hover:bg-gradient-to-b hover:from-[#1E3363] hover:to-[#3D68C9] hover:text-white'
          }
          `}
        >
          <div className="absolute rounded-xl" />

          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl"
            />
          )}

          <Icon className="relative z-10 transition-all duration-200" size={32} />
        </motion.div>

        {/* Label */}
        <motion.span
          className={`
            whitespace-nowrap text-xs font-semibold mt-1 transition-all duration-200
            ${
            isActive
              ? 'opacity-100 text-[#1E3363] dark:text-white'
              : 'opacity-0 group-hover:opacity-100 dark:text-gray-300'
          }
          `}
        >
          {module}
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default AppDocItem;

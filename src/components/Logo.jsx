import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-70"></div>
        <div className="relative bg-dark-900 dark:bg-white text-white dark:text-dark-900 rounded-full h-8 w-8 flex items-center justify-center font-bold">
          MC
        </div>
      </div>
      <span className="text-dark-900 dark:text-white font-bold text-xl">MindCraft</span>
    </motion.div>
  );
};

export default Logo;
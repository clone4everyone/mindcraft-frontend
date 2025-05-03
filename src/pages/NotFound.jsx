import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCode } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const codeBlockVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black dark:bg-dark-900  flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-primary-400/20 to-secondary-400/20 blur-3xl"
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-secondary-400/20 to-primary-400/20 blur-3xl"
        animate={{ 
          x: [0, -30, 0], 
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-2xl w-full text-center"
      >
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="mb-8"
        >
          <motion.div 
            className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            style={{ backgroundSize: '200% auto' }}
          >
            404
          </motion.div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold mb-4 dark:text-white text-gray-800"
        >
          Page Not Found
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-300 mb-8"
        >
          Looks like this test case returned an unexpected result
        </motion.p>

        <motion.div 
          variants={codeBlockVariants}
          className="bg-dark-800 rounded-lg p-6 mb-8 text-left"
        >
          <pre className="font-mono text-sm">
            <code className="text-gray-300">
              <span className="text-red-400">Error</span>: {`{`}
              <br />
              &nbsp;&nbsp;<span className="text-green-400">status</span>: <span className="text-yellow-400">404</span>,
              <br />
              &nbsp;&nbsp;<span className="text-green-400">message</span>: <span className="text-blue-400">"Page not found"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-green-400">path</span>: <span className="text-blue-400">"{window.location.pathname}"</span>
              <br />
              {`}`}
            </code>
          </pre>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center space-x-4">
          <motion.button
            onClick={() => navigate('/')}
            className="btn btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Go Back Home</span>
          </motion.button>

        
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
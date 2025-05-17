import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import CodeEditor from './CodeEditor';
import { useClerk,useUser } from '@clerk/clerk-react';
import {useNavigate} from 'react-router-dom';
const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimationControls();
  const { redirectToSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  const handleGetStarted = () => {
    if(isSignedIn) {
    navigate("/user/new")
    }else{
        redirectToSignIn();
    }
  
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const bounceVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        delay: 1.5,
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background gradient and mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-dark-900 dark:to-dark-800 -z-10"></div>
      <div className="mesh-overlay -z-10"></div>
      
      {/* Animated blobs in background */}
      <motion.div 
        className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-primary-400/20 to-secondary-400/20 blur-3xl -z-10"
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
        className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-secondary-400/20 to-accent-400/20 blur-3xl -z-10"
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

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            ref={ref}
            className="w-full lg:w-1/2 mb-12 lg:mb-0"
            initial="hidden"
            animate={mainControls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex space-x-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
                Beta Access
              </span>
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300 rounded-full">
                New Feature
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Create Tests With <span className="text-gradient">Simple Prompts</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-dark-600 dark:text-dark-200 mb-8 max-w-xl"
            >
              Generate professional, comprehensive tests instantly using natural language prompts. Save hours of development time and ensure thorough test coverage.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.p 
                onClick={handleGetStarted}
                className="btn btn-primary flex items-center justify-center sm:justify-start space-x-2 group hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hover:cursor-pointer " >Get Started Free</span>
                <motion.span
                  variants={bounceVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </motion.p>
              
          
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex items-center space-x-1 text-sm text-dark-500 dark:text-dark-300"
            >
              <span>Trusted by</span>
              <div className="flex items-center -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs shadow-md border-2 border-white dark:border-dark-800"
                  >
                    {['M', 'N', 'T', 'E'][i-1]}
                  </div>
                ))}
              </div>
              <span>and 1,000+ developers</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2 lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-2xl blur-md opacity-70 -z-10"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5], 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <div className="relative bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-700">
                <CodeEditor />
              </div>

              <motion.div 
                className="absolute -right-6 -bottom-6 bg-gradient-to-br from-accent-500 to-accent-600 text-white px-4 py-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-sm font-semibold">Instant generation!</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-dark-400 dark:border-dark-600 flex justify-center pt-2"
          animate={{ 
            y: [0, 10, 0], 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-dark-400 dark:bg-dark-600 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;